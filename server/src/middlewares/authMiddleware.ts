import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Request 타입 확장 (cookies 속성 추가)
interface AuthRequest extends Request {
  cookies: { token?: string };
  user?: {
    id: string;
    username: string;
  };
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.token; // cookies 속성에서 토큰 가져오기

  if (!token) {
    res.status(401).json({ message: '인증되지 않은 사용자' });
    return;
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || 'default-secret',
    (err, decoded) => {
      if (err || !decoded || typeof decoded === 'string') {
        console.log('❌ [authMiddleware] JWT 검증 실패');
        res.status(401).json({ message: '토큰이 유효하지 않습니다.' });
        return;
      }

      req.user = {
        id: (decoded as JwtPayload).id,
        username: (decoded as JwtPayload).username,
      };

      next();
    }
  );
};

export default authMiddleware;
