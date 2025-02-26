import express, { Response, Request, NextFunction } from 'express';
import pool from '../db'; // ← 'db' 대신 Postgres pool import
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// ✅ authMiddleware에서 확장한 타입 사용
interface AuthRequest extends Request {
  user: {
    id: string;
    username: string;
  };
}

// ✅ 타입 단언 없이 req를 직접 AuthRequest로 캐스팅하여 해결
const withAuth = (
  handler: (req: AuthRequest, res: Response, next: NextFunction) => void
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req as AuthRequest, res, next);
  };
};

/**
 * 📌 ✅ 도서 저장 (중복 방지)
 *    - 기존 sqlite: db.get → db.run
 *    - 변경: pool.query(...) 두 번 (SELECT, INSERT)
 */
router.post(
  '/save',
  authMiddleware,
  withAuth(async (req, res) => {
    const { title, authors, thumbnail, isbn, read_date, memo } = req.body;
    const user_id = req.user.id;

    if (!isbn || !title) {
      return res.status(400).json({ message: '필수 정보가 누락되었습니다.' });
    }

    try {
      // ✅ 중복 방지: 이미 저장된 책인지 확인
      const {
        rows: [existingBook],
      } = await pool.query(
        'SELECT * FROM books WHERE user_id = $1 AND isbn = $2',
        [user_id, isbn]
      );

      if (existingBook) {
        return res.status(409).json({ message: '이미 저장된 도서입니다.' });
      }

      // ✅ 도서 저장
      await pool.query(
        `INSERT INTO books
         (user_id, title, authors, thumbnail, isbn, read_date, memo)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [user_id, title, authors, thumbnail, isbn, read_date, memo ?? '']
      );

      res.json({ message: '도서 저장 성공' });
    } catch (error) {
      console.error('도서 저장 중 오류:', error);
      res.status(500).json({ message: '도서 저장 실패', error });
    }
  })
);

/**
 * 📌 ✅ 저장된 도서 목록 조회 (무한 스크롤 지원)
 *    - 기존 sqlite: db.all
 *    - 변경: pool.query(...) 동적 쿼리 구성
 */
router.get(
  '/saved',
  authMiddleware,
  withAuth(async (req, res) => {
    const user_id = req.user.id;
    const { cursor, limit } = req.query;
    const pageSize = parseInt(limit as string, 10) || 8; // ✅ 기본 limit: 8개

    try {
      // ✅ 동적으로 WHERE/ORDER/LIMIT 구성
      //    $1, $2 등 포지션 파라미터를 순서대로 채움
      let query = 'SELECT * FROM books WHERE user_id = $1';
      const params: any[] = [user_id];
      let paramIndex = 2;

      // cursor가 있으면 read_date < cursor
      if (cursor) {
        query += ` AND read_date < $${paramIndex}`;
        params.push(cursor);
        paramIndex++;
      }

      query += ` ORDER BY read_date DESC, id DESC LIMIT $${paramIndex}`;
      params.push(pageSize);

      const result = await pool.query(query, params);
      const books = result.rows;

      // ✅ 다음 페이지 존재 여부 확인
      //    DESC라서 가장 마지막(오래된)의 read_date를 nextCursor로 지정
      const nextCursor =
        books.length === pageSize ? books[books.length - 1].read_date : null;

      res.json({ books, nextCursor });
    } catch (error) {
      console.error('📌 DB 조회 중 오류 발생:', error);
      res.status(500).json({ message: '도서 목록 조회 실패', error });
    }
  })
);

/**
 * 📌 ✅ 도서 정보 수정
 *    - 기존 sqlite: db.run
 *    - 변경: pool.query(...) → rowCount 반환
 */
router.patch(
  '/update/:isbn',
  authMiddleware,
  withAuth(async (req, res) => {
    const { isbn } = req.params;
    const { read_date, memo } = req.body;
    const user_id = req.user.id;

    if (!isbn) {
      return res.status(400).json({ message: 'ISBN이 필요합니다.' });
    }

    try {
      const query = `
        UPDATE books
        SET read_date = $1, memo = $2
        WHERE isbn = $3 AND user_id = $4
      `;

      const result = await pool.query(query, [read_date, memo, isbn, user_id]);
      const changes = result.rowCount; // 몇 행이 업데이트되었는지

      if (changes === 0) {
        return res.status(404).json({ message: '책을 찾을 수 없습니다.' });
      }

      res.json({ message: '도서 수정 성공' });
    } catch (error) {
      console.error('📌 책 수정 중 오류 발생:', error);
      res.status(500).json({ message: '도서 수정 실패', error });
    }
  })
);

/**
 * 📌 ✅ 도서 삭제
 *    - 기존 sqlite: db.run
 *    - 변경: pool.query(...) → rowCount로 삭제된 행 체크
 */
router.delete(
  '/delete/:isbn',
  authMiddleware,
  withAuth(async (req, res) => {
    const { isbn } = req.params;
    const user_id = req.user.id;

    if (!isbn) {
      return res.status(400).json({ message: 'ISBN이 필요합니다.' });
    }

    try {
      const result = await pool.query(
        'DELETE FROM books WHERE isbn = $1 AND user_id = $2',
        [isbn, user_id]
      );
      const changes = result.rowCount;

      if (changes === 0) {
        return res.status(404).json({ message: '책을 찾을 수 없습니다.' });
      }

      res.json({ message: '도서 삭제 성공' });
    } catch (error) {
      console.error('📌 책 삭제 중 오류 발생:', error);
      res.status(500).json({ message: '도서 삭제 실패', error });
    }
  })
);

export default router;
