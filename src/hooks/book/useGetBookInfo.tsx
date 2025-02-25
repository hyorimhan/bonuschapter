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
    queryFn: ({ pageParam }) => GetBookInfo({ pageParam }), // ✅ API 변경 반영
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null, // ✅ nextCursor 기반 페이지네이션
  });

  console.log('Fetched Infinite Data:', data);

  return {
    books: data?.pages?.flatMap((page) => page.books) ?? [], // ✅ books 데이터 변환
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isPending,
  };
};
