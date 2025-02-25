import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../../component/common/Button';
import Input from '../../component/common/Input';
import { useForm } from 'react-hook-form';
import useBookRegisterMutation from '../book/useBookRegister';
import { BooksType } from '../../zustand/useBookStore';
import { READ_DATE_VALIDATION } from '../../constants/registerValidation';
import { useInfiniteBookInfo } from '../book/useGetBookInfo';

interface ModalProps {
  title: string;
  content: ReactNode;
  img?: string;
  form?: boolean;
  btn?: ReactNode;
  bookData?: BooksType;
}

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectBook, setSelectBook] = useState<ModalProps | null>(null);
  const { register, handleSubmit } = useForm<{
    read_date: number;
    memo: string;
  }>();
  const useRegisterMutation = useBookRegisterMutation();
  const { books } = useInfiniteBookInfo();

  const openModal = ({
    title,
    content,
    img,
    form = false,
    btn,
    bookData,
  }: ModalProps) => {
    setSelectBook({ title, content, img, form, btn, bookData });
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setSelectBook(null);
  };

  const onSubmit = (data: { read_date: number; memo: string }) => {
    if (books.some((book) => book.isbn === selectBook?.bookData?.isbn)) {
      return alert('이미 등록된 책입니다');
    }

    const combinedData = {
      read_date: new Date(data.read_date).getTime(),
      thumbnail: selectBook?.bookData?.thumbnail ?? '',
      title: selectBook?.bookData?.title ?? '',
      authors: selectBook?.bookData?.authors ?? [],
      datetime: selectBook?.bookData?.datetime ?? '',
      isbn: selectBook?.bookData?.isbn ?? '',
      memo: data?.memo ?? '',
    };

    useRegisterMutation.mutate(combinedData);
    closeModal();
  };

  const ModalComponent = isOpen
    ? createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          <div
            className="relative w-full max-w-lg p-6 min-h-[500px] bg-white rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col justify-center items-center">
              {selectBook?.form ? (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-4 w-full text-center"
                >
                  <div className="text-xl font-semibold">
                    {selectBook?.title}
                  </div>
                  <div>{selectBook?.content}</div>
                  {selectBook?.img && (
                    <div className="flex justify-center items-center w-full">
                      <img
                        src={selectBook?.img}
                        alt="thumbnail"
                        className="max-w-xs"
                      />
                    </div>
                  )}

                  <Input
                    type="date"
                    id="read_date"
                    register={register('read_date', READ_DATE_VALIDATION)}
                  />
                  <Input
                    type="textarea"
                    id="memo"
                    register={register('memo')}
                  />
                  <div className="flex justify-center gap-3">
                    {' '}
                    <Button
                      type="submit"
                      name="등록"
                      className="mt-4 bg-gray-300 p-2 rounded-lg cursor-pointer"
                    />
                    <Button
                      onClick={closeModal}
                      className="mt-4 bg-gray-300 p-2 rounded-lg cursor-pointer"
                      name="닫기"
                    />
                  </div>
                </form>
              ) : (
                <>
                  <div className="text-xl font-semibold">
                    {selectBook?.title}
                  </div>
                  {selectBook?.img && (
                    <img src={selectBook?.img} alt="thumbnail" />
                  )}
                  <div>{selectBook?.content}</div>
                </>
              )}
            </div>
            {selectBook?.btn}
          </div>
        </div>,
        document.getElementById('modal-root')!
      )
    : null;

  return { openModal, ModalComponent };
};

export default useModal;
