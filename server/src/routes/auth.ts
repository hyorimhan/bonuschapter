import express, { Request, Response } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import {
  signupHandler,
  loginHandler,
  logoutHandler,
} from '../controllers/authController';

// Request 타입 확장
interface AuthRequest extends Request {
  user?: { id: string; username: string };
}

const router = express.Router();

router.post('/signup', signupHandler);
router.post('/login', loginHandler);
router.post('/logout', logoutHandler);

router.get('/me', authMiddleware, (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ message: '로그인되지 않은 사용자' });
    return;
  }
  res.json({ id: req.user.id, username: req.user.username });
});

export default router;
