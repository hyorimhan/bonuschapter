import { useNavigate } from 'react-router-dom';
import { BooksType } from '../../zustand/useBookStore';
import { useBookDetailStore } from '../../zustand/useBookDetailStore';
import { useEffect } from 'react';
import { useInfiniteBookInfo } from '../../hooks/book/useGetBookInfo';
import Loading from '../common/Loading';
import { useInfoQuery } from '../../hooks/auth/useInfo';

function GetRegisterBook() {
  const { books, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useInfiniteBookInfo();
  const { setIsbn } = useBookDetailStore();
  const navigate = useNavigate();
  const { userInfo } = useInfoQuery();

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
  if (isPending) return <Loading />;
  return (
    <>
      <span className="text-4xl justify-center flex mt-20 mb-10">읽은 책</span>
      <div className="grid grid-cols-5 gap-3">
        {books.length > 0 && userInfo ? (
          books.map((post: BooksType, index) =>
            post?.title ? (
              <div
                key={post.isbn ?? index}
                className="cursor-pointer p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-md"
                onClick={() => {
                  if (post?.isbn) {
                    setIsbn(post.isbn);
                    navigate('/book-detail');
                  }
                }}
              >
                <div className="flex flex-col items-center justify-center mt-3 text-sm text-gray-500">
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  {post.thumbnail ? (
                    <img src={post.thumbnail} alt="책 표지" />
                  ) : (
                    <div className="w-32 h-48 bg-gray-300 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                  <span>
                    {post.read_date &&
                      (!isNaN(Number(post.read_date))
                        ? new Date(Number(post.read_date))
                            .toISOString()
                            .split('T')[0]
                        : post.read_date)}{' '}
                  </span>
                </div>
              </div>
            ) : null
          )
        ) : (
          <p className="text-center col-span-5 text-gray-500">
            불러올 책이 없습니다.
          </p>
        )}
      </div>
      {isFetchingNextPage && <p className="text-center mt-4">로딩 중...</p>}
    </>
  );
}

export default GetRegisterBook;
