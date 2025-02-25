// import express, { Response, Request, NextFunction } from 'express';
// import db from '../db/index';
// import authMiddleware from '../middlewares/authMiddleware';

// const router = express.Router();

// // ✅ authMiddleware에서 확장한 타입 사용
// interface AuthRequest extends Request {
//   user: {
//     id: string;
//     username: string;
//   };
// }

// // ✅ 타입 단언 없이 req를 직접 AuthRequest로 캐스팅하여 해결
// const withAuth = (
//   handler: (req: AuthRequest, res: Response, next: NextFunction) => void
// ) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     handler(req as AuthRequest, res, next);
//   };
// };

// /** 📌 ✅ 도서 저장 (중복 방지) */
// router.post(
//   '/save',
//   authMiddleware,
//   withAuth(async (req, res) => {
//     const { title, authors, thumbnail, isbn, read_date, memo } = req.body;
//     const user_id = req.user.id;

//     if (!isbn || !title) {
//       return res.status(400).json({ message: '필수 정보가 누락되었습니다.' });
//     }

//     try {
//       // ✅ 중복 방지: 이미 저장된 책인지 확인
//       const existingBook = await new Promise<any>((resolve, reject) => {
//         db.get(
//           'SELECT * FROM books WHERE user_id = ? AND isbn = ?',
//           [user_id, isbn],
//           (err, row) => {
//             if (err) reject(err);
//             else resolve(row);
//           }
//         );
//       });

//       if (existingBook) {
//         return res.status(409).json({ message: '이미 저장된 도서입니다.' });
//       }

//       // ✅ 도서 저장
//       const query = `INSERT INTO books (user_id, title, authors, thumbnail, isbn, read_date, memo) VALUES (?, ?, ?, ?, ?, ?, ?)`;
//       await new Promise<void>((resolve, reject) => {
//         db.run(query, [user_id, title, authors, thumbnail, isbn, read_date, memo ?? ''], (err) => {
//           if (err) reject(err);
//           else resolve();
//         });
//       });

//       res.json({ message: '도서 저장 성공' });
//     } catch (error) {
//       console.error('도서 저장 중 오류:', error);
//       res.status(500).json({ message: '도서 저장 실패', error });
//     }
//   })
// );

// /** 📌 ✅ 저장된 도서 목록 조회 (무한 스크롤 지원) */
// router.get(
//   '/saved',
//   authMiddleware,
//   withAuth(async (req, res) => {
//     const user_id = req.user.id;
//     const { cursor, limit } = req.query;
//     const pageSize = parseInt(limit as string) || 8; // ✅ 기본 limit: 8개

//     try {
//       let query = 'SELECT * FROM books WHERE user_id = ?';
//       const params: any[] = [user_id];

//       if (cursor) {
//         query += ' AND id > ?';
//         params.push(cursor);
//       }

//       query += ' ORDER BY id ASC LIMIT ?';
//       params.push(pageSize);

//       const books = await new Promise<any[]>((resolve, reject) => {
//         db.all(query, params, (err, rows) => {
//           if (err) reject(err);
//           else resolve(rows);
//         });
//       });

//       // ✅ 다음 페이지 존재 여부 확인
//       const nextCursor = books.length === pageSize ? books[books.length - 1].id : null;

//       res.json({ books, nextCursor });
//     } catch (error) {
//       console.error('📌 DB 조회 중 오류 발생:', error);
//       res.status(500).json({ message: '도서 목록 조회 실패', error });
//     }
//   })
// );

// /** 📌 ✅ 도서 정보 수정 */
// router.patch(
//   '/update/:isbn',
//   authMiddleware,
//   withAuth(async (req, res) => {
//     const { isbn } = req.params;
//     const { read_date, memo } = req.body;
//     const user_id = req.user.id;

//     if (!isbn) {
//       return res.status(400).json({ message: 'ISBN이 필요합니다.' });
//     }

//     try {
//       const query = `
//         UPDATE books
//         SET read_date = ?, memo = ?
//         WHERE isbn = ? AND user_id = ?
//       `;

//       const changes = await new Promise<number>((resolve, reject) => {
//         db.run(query, [read_date, memo, isbn, user_id], function (err) {
//           if (err) reject(err);
//           else resolve(this.changes);
//         });
//       });

//       if (changes === 0) {
//         return res.status(404).json({ message: '책을 찾을 수 없습니다.' });
//       }

//       res.json({ message: '도서 수정 성공' });
//     } catch (error) {
//       console.error('📌 책 수정 중 오류 발생:', error);
//       res.status(500).json({ message: '도서 수정 실패', error });
//     }
//   })
// );

// /** 📌 ✅ 도서 삭제 */
// router.delete(
//   '/delete/:isbn',
//   authMiddleware,
//   withAuth(async (req, res) => {
//     const { isbn } = req.params;
//     const user_id = req.user.id;

//     if (!isbn) {
//       return res.status(400).json({ message: 'ISBN이 필요합니다.' });
//     }

//     try {
//       const changes = await new Promise<number>((resolve, reject) => {
//         db.run('DELETE FROM books WHERE isbn = ? AND user_id = ?', [isbn, user_id], function (err) {
//           if (err) reject(err);
//           else resolve(this.changes);
//         });
//       });

//       if (changes === 0) {
//         return res.status(404).json({ message: '책을 찾을 수 없습니다.' });
//       }

//       res.json({ message: '도서 삭제 성공' });
//     } catch (error) {
//       console.error('📌 책 삭제 중 오류 발생:', error);
//       res.status(500).json({ message: '도서 삭제 실패', error });
//     }
//   })
// );

// export default router;
import express, { Response, Request, NextFunction } from 'express';
import db from '../db/index';
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

/** 📌 ✅ 도서 저장 (중복 방지) */
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
      const existingBook = await new Promise<any>((resolve, reject) => {
        db.get(
          'SELECT * FROM books WHERE user_id = ? AND isbn = ?',
          [user_id, isbn],
          (err, row) => {
            if (err) reject(err);
            else resolve(row);
          }
        );
      });

      if (existingBook) {
        return res.status(409).json({ message: '이미 저장된 도서입니다.' });
      }

      // ✅ 도서 저장
      const query = `INSERT INTO books (user_id, title, authors, thumbnail, isbn, read_date, memo) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      await new Promise<void>((resolve, reject) => {
        db.run(
          query,
          [user_id, title, authors, thumbnail, isbn, read_date, memo ?? ''],
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });

      res.json({ message: '도서 저장 성공' });
    } catch (error) {
      console.error('도서 저장 중 오류:', error);
      res.status(500).json({ message: '도서 저장 실패', error });
    }
  })
);

/** 📌 ✅ 저장된 도서 목록 조회 (무한 스크롤 지원) */
router.get(
  '/saved',
  authMiddleware,
  withAuth(async (req, res) => {
    const user_id = req.user.id;
    const { cursor, limit } = req.query;
    const pageSize = parseInt(limit as string) || 8; // ✅ 기본 limit: 8개

    try {
      let query = 'SELECT * FROM books WHERE user_id = ?';
      const params: any[] = [user_id];

      if (cursor) {
        query += ' AND read_date < ?'; // ✅ 최신 read_date부터 가져오기 위해 read_date 내림차순 정렬
        params.push(cursor);
      }

      query += ' ORDER BY read_date DESC, id DESC LIMIT ?'; // ✅ 최신 읽은 날짜순 정렬 + 같은 날짜일 경우 최신 등록순
      params.push(pageSize);

      const books = await new Promise<any[]>((resolve, reject) => {
        db.all(query, params, (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });

      // ✅ 다음 페이지 존재 여부 확인 (DESC 기준이므로 가장 오래된 read_date를 nextCursor로 설정)
      const nextCursor =
        books.length === pageSize ? books[books.length - 1].read_date : null;

      res.json({ books, nextCursor });
    } catch (error) {
      console.error('📌 DB 조회 중 오류 발생:', error);
      res.status(500).json({ message: '도서 목록 조회 실패', error });
    }
  })
);

/** 📌 ✅ 도서 정보 수정 */
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
        SET read_date = ?, memo = ? 
        WHERE isbn = ? AND user_id = ?
      `;

      const changes = await new Promise<number>((resolve, reject) => {
        db.run(query, [read_date, memo, isbn, user_id], function (err) {
          if (err) reject(err);
          else resolve(this.changes);
        });
      });

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

/** 📌 ✅ 도서 삭제 */
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
      const changes = await new Promise<number>((resolve, reject) => {
        db.run(
          'DELETE FROM books WHERE isbn = ? AND user_id = ?',
          [isbn, user_id],
          function (err) {
            if (err) reject(err);
            else resolve(this.changes);
          }
        );
      });

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
