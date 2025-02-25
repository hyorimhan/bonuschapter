import { Request, RequestHandler, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db';

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
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (id, username, password) VALUES (?, ?, ?)`;

    await new Promise<void>((resolve, reject) => {
      db.run(
        query,
        [String(id), String(username), hashedPassword],
        function (err) {
          if (err) reject(err);
          else resolve();
        }
      );
    });

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
    const user = await new Promise<
      { id: string; username: string; password: string } | undefined
    >((resolve, reject) => {
      const query = `SELECT * FROM users WHERE id = ?`;
      db.get(query, [id], (err: Error | null, row: any) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!user) {
      res.status(401).json({ message: '존재하지 않는 사용자입니다.' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: '비밀번호가 올바르지 않습니다.' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '1h' }
    );

    // 쿠키 설정
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600000,
      path: '/',
      domain: 'localhost',
    });

    console.log('🔐 로그인 성공: 토큰이 쿠키에 설정됨');
    res
      .status(200)
      .json({
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

// ✅ 로그아웃 핸들러 추가
export const logoutHandler: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      domain: 'localhost',
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
