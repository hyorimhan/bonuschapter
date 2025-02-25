import { create } from 'zustand';

export interface BooksType {
  thumbnail?: string | null;
  title: string;
  authors: string[];
  datetime: string;
  isbn: string;
  memo?: string;
  read_date?: number;
}

export interface BooksDataType {
  meta: object;
  documents: BooksType[];
}

interface BookStore {
  booksData: BooksType | null;
  setBooksData: (newData: BooksType) => void;
}

export const useBookStore = create<BookStore>((set) => ({
  booksData: null,
  setBooksData: (newData: BooksType) => set({ booksData: newData }),
}));
