import { Request, RequestHandler, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// 🍀 postgres pool import
import pool from '../db';

export const signupHandler: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log('📌 회원가입 요청 데이터:', req.body);

  const { id, username, password } = req.body;

  if (!id || !username || !password) {
    res.status(400).json({
      message: '모든 필드(id, username, password)를 입력해주세요.',
    });
    return;
  }

  try {
    // 1) 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2) PostgreSQL에 회원 삽입
    //    (Sqlite: INSERT INTO ... VALUES (?, ?, ?) → PG: $1, $2, $3)
    await pool.query(
      `INSERT INTO users (id, username, password)
       VALUES ($1, $2, $3)`,
      [String(id), String(username), hashedPassword]
    );

    res.status(201).json({ message: '회원가입 성공', userId: id });
  } catch (err) {
    console.error('회원가입 에러:', err);
    res.status(500).json({
      message: '회원가입 실패',
      error: err instanceof Error ? err.message : '알 수 없는 오류',
    });
  }
};

export const loginHandler: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id, password } = req.body;

  if (!id || !password) {
    res.status(400).json({ message: '아이디와 비밀번호를 입력해주세요.' });
    return;
  }

  try {
    // 1) 사용자 조회
    //    (Sqlite: db.get('SELECT * FROM users WHERE id = ?', ...)
    //     → PG: pool.query('SELECT * FROM ... WHERE id = $1', [id]))
    const { rows } = await pool.query(
      `SELECT id, username, password FROM users WHERE id = $1`,
      [id]
    );
    const user = rows[0];

    // 2) 사용자 존재 여부
    if (!user) {
      res.status(401).json({ message: '존재하지 않는 사용자입니다.' });
      return;
    }

    // 3) 비밀번호 비교
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: '비밀번호가 올바르지 않습니다.' });
      return;
    }

    // 4) JWT 발급
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '1h' }
    );

    // 5) 쿠키에 토큰 저장
    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // HTTPS 환경이면 true (Vercel 배포 시)
      sameSite: 'none', // cross-site 허용
      maxAge: 3600000, // 1시간
      path: '/',
    });

    console.log('🔐 로그인 성공: 토큰이 쿠키에 설정됨');
    res.status(200).json({
      message: '로그인 성공',
      user: { id: user.id, username: user.username },
    });
  } catch (err) {
    console.error('로그인 에러:', err);
    res.status(500).json({
      message: '로그인 중 오류 발생',
      error: err instanceof Error ? err.message : '알 수 없는 오류',
    });
  }
};

// ✅ 로그아웃 핸들러
export const logoutHandler: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // 쿠키 제거
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });

    console.log('🔓 로그아웃 성공: 쿠키 삭제됨');
    res.status(200).json({ message: '로그아웃 성공' });
  } catch (err) {
    console.error('로그아웃 에러:', err);
    res.status(500).json({
      message: '로그아웃 중 오류 발생',
      error: err instanceof Error ? err.message : '알 수 없는 오류',
    });
  }
};
