import { useQuery } from '@tanstack/react-query';
import { getRecommendedBooks } from '../../api/book/BestSeller';

export const useRecommendBooks = () => {
  const {
    data: booksData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['booksData'],
    queryFn: getRecommendedBooks,
  });
  return { booksData, isPending, isError };
};
