import { BooksType } from '../../zustand/useBookStore';

const default_url = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const BookRegister = async (book: BooksType) => {
  try {
    const response = await fetch(`${default_url}/api/books/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        title: book.title,
        authors: book.authors,
        thumbnail: book.thumbnail,
        isbn: book.isbn,
        read_date: book.read_date,
        memo: book.memo,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || '책 등록 실패');
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
