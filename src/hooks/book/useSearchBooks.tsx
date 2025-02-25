import { useQuery } from '@tanstack/react-query';
import { BookSearch } from '../../api/book/BookSearch';

export const useSearchBooks = (query: string, page: number, size: number) => {
  const {
    data: searchData = { meta: {}, documents: [] },
    isPending,
    isError,
  } = useQuery({
    queryKey: ['searchData', query, page, size],
    queryFn: () => BookSearch(query, page, size),
    enabled: !!query,
  });

  return { searchData, isPending, isError };
};
