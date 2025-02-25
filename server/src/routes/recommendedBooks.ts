import dotenv from 'dotenv';
import axios from 'axios';
import express, { Request, Response } from 'express';
import { parseStringPromise } from 'xml2js';

dotenv.config({ path: '.env.local' });

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.SERVICE_KEY;
    const apiUrl = `http://data4library.kr/api/loanItemSrch?authKey=${apiKey}&startDt=2025-01-01&endDt=2025-02-14`;

    // ✅ axios로 XML 데이터 가져오기
    const response = await axios.get(apiUrl, { responseType: 'text' });

    // ✅ XML -> JSON 변환
    const jsonData = await parseStringPromise(response.data, {
      explicitArray: false,
    });

    // ✅ 필요 데이터 추출
    const books = jsonData.response.docs.doc.map((book: any) => ({
      ranking: book.ranking,
      title: book.bookname.replace(/ *:.*$/, ''), // 책 제목에서 불필요한 부분 제거
      author: book.authors.replace(/^지은이: /, ''), // "지은이: " 제거
      publisher: book.publisher,
      year: book.publication_year,
      isbn13: book.isbn13,
      loanCount: book.loan_count,
      cover: book.bookImageURL,
      detailUrl: book.bookDtlUrl.trim(), // URL 앞뒤 공백 제거
    }));

    res.json({ books }); // JSON으로 응답
  } catch (error: any) {
    console.error(
      '📌 추천도서 API 오류:',
      error.response?.data || error.message
    );
    res.status(500).json({ error: '추천도서 데이터를 불러오는 중 오류 발생' });
  }
});

export default router;
