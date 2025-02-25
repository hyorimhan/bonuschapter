import { useForm } from 'react-hook-form';
import { useBookDetailStore } from '../../zustand/useBookDetailStore';
import { BooksType } from '../../zustand/useBookStore';
import BaseLayout from '../layout/BaseLayout';
import Button from '../common/Button';
import useDeleteBookInfo from '../../hooks/book/useDeleteBookInfo';
import { useInfiniteBookInfo } from '../../hooks/book/useGetBookInfo';
import Input from '../common/Input';
import { READ_DATE_VALIDATION } from '../../constants/registerValidation';
import usePatchBookInfo from '../../hooks/book/usePatchBookInfo';

function BookDetail() {
  const { books } = useInfiniteBookInfo();
  const { isbn } = useBookDetailStore();

  const { handleSubmit, register } = useForm();
  const useDeleteMutation = useDeleteBookInfo();
  const usePatchMutation = usePatchBookInfo();

  const filteredBooks = books.filter((book) => book.isbn === isbn);
  console.log(books);
  return (
    <BaseLayout>
      {' '}
      {filteredBooks?.map((post: BooksType) => (
        <form
          onSubmit={handleSubmit((data) =>
            usePatchMutation.mutate({
              isbn: post.isbn,
              read_date: data.read_date || post.read_date,
              memo: data.memo || post.memo,
            })
          )}
          key={post.isbn}
        >
          <div className="cursor-pointer p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-md">
            <div className="flex flex-col items-center justify-center mt-3 text-sm text-gray-500">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <img src={post.thumbnail!} alt="img" width={300} height={300} />

              <Input
                label="읽은 날짜"
                type="date"
                defaultValue={
                  post.read_date && !isNaN(Number(post.read_date))
                    ? new Date(Number(post.read_date))
                        .toISOString()
                        .split('T')[0]
                    : post.read_date
                }
                id="read_date"
                register={register('read_date', READ_DATE_VALIDATION)}
              />

              <Input
                type="textarea"
                id="memo"
                register={register('memo')}
                defaultValue={post.memo}
              />
            </div>
          </div>{' '}
          <div className="flex justify-center gap-3">
            {' '}
            <Button type="submit" name="수정" className="cursor-pointer" />
            <Button
              type="button"
              name="삭제"
              className="cursor-pointer"
              onClick={() => useDeleteMutation.mutate(post.isbn)}
            />
          </div>{' '}
        </form>
      ))}
    </BaseLayout>
  );
}

export default BookDetail;
