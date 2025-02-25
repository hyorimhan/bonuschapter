import { Swiper, SwiperSlide } from 'swiper/react';

interface BooksType {
  isbn13: string;
  title: string;
  author: string;
  cover: string;
}
import { Pagination, Autoplay } from 'swiper/modules';
import Loading from '../common/Loading';
import { useRecommendBooks } from '../../hooks/common/useRecommendBooks';
function RecommendBooks() {
  const { booksData, isPending } = useRecommendBooks();

  if (isPending) return <Loading />;
  return (
    <>
      <span className="text-4xl flex justify-center"> 베스트 셀러</span>

      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper mt-10"
      >
        {booksData?.map((books: BooksType) => (
          <SwiperSlide key={books.isbn13}>
            <span className="text-xl text-center"> {books?.title} -</span>
            <span className="text-lg">{books.author}</span>
            <span>
              <img src={books.cover} width={300} height={300} />
            </span>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default RecommendBooks;
