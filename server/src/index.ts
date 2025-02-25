import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import recommendedBooksRoutes from './routes/recommendedBooks';
import bookRoutes from './routes/books';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  })
);

app.use(express.json());
app.use(helmet());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/api/recommended-books', recommendedBooksRoutes);
app.use('/api/books', bookRoutes);

// ✅ 테스트용 API 엔드포인트 추가
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Vercel API!' });
});

export default app;
