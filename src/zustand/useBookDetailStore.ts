import { create } from 'zustand';

interface BooksDetailType {
  isbn: string;
  setIsbn: (isbn: string) => void;
}

export const useBookDetailStore = create<BooksDetailType>((set) => ({
  isbn: '',
  setIsbn: (newIsbn: string) => set({ isbn: newIsbn }),
}));
