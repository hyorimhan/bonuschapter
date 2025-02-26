import { useInfiniteQuery } from '@tanstack/react-query';
import GetBookInfo from '../../api/book/GetBookInfo';

export const useInfiniteBookInfo = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['infiniteBookInfo'],
    queryFn: ({ pageParam }) => GetBookInfo({ pageParam }),
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
  });

  return {
    books: data?.pages?.flatMap((page) => page.books) ?? [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isPending,
  };
};
