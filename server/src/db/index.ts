// src/db/index.ts (예시)

import { Pool } from 'pg';

// 1) PostgreSQL Pool 생성
//    - 반드시 Vercel 환경변수(DATABASE_URL)에 Connection String을 넣어둬야 합니다.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // Neon, Supabase 등 서버리스 Postgres 사용 시 대부분 필요
    rejectUnauthorized: false,
  },
});

// 2) DB 연결 성공 시, 테이블 생성 함수 호출
pool
  .connect()
  .then(() => {
    console.log('✅ PostgreSQL 데이터베이스 연결됨');
    createTables(); // (선택) 서버 시작 시 자동 테이블 생성
  })
  .catch((err) => {
    console.error('❌ 데이터베이스 연결 실패:', err);
  });

// 3) 테이블 생성 함수
//    - Sqlite에서 하던 것처럼, users & books 테이블을 자동 생성
async function createTables() {
  try {
    // ✅ users 테이블
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE,
        password TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // ✅ books 테이블
    await pool.query(`
      CREATE TABLE IF NOT EXISTS books (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        title TEXT,
        authors TEXT,
        thumbnail TEXT,
        isbn TEXT,
        read_date TEXT,
        memo TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log('✅ PostgreSQL 테이블 생성 완료');
  } catch (error) {
    console.error('❌ 테이블 생성 에러:', error);
  }
}

// 4) Pool 객체 export
export default pool;
