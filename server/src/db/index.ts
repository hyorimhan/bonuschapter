import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('데이터베이스 연결 실패:', err);
  } else {
    console.log('✅ SQLite 데이터베이스 연결됨');
  }
});

// ✅ users 테이블 생성
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);
});

// ✅ books 테이블 생성 (memo 컬럼 추가됨)
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS books (
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
  )`);
});

export default db;
