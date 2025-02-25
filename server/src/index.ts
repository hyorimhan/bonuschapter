import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import recommendedBooksRoutes from './routes/recommendedBooks';
import bookRoutes from './routes/books'; // ✅ 도서 API 라우트 추가

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
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

app.listen(port, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${port}`);
});
