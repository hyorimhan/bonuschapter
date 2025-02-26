import BaseLayout from './layout/BaseLayout';
import RecommendBooks from './book/RecommendBooks';
import GetRegisterBook from './book/GetRegisterBook';
import { useInfiniteBookInfo } from '../hooks/book/useGetBookInfo';

function Home() {
  const { books } = useInfiniteBookInfo();
  return (
    <BaseLayout>
      <RecommendBooks />
      {books && books.length > 0 && <GetRegisterBook />}
    </BaseLayout>
  );
}

export default Home;
