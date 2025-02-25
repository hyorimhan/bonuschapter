import { useMutation } from '@tanstack/react-query';
import PatchBookInfo from '../../api/book/PatchBookInfo';

const usePatchBookInfo = () => {
  return useMutation({
    mutationFn: ({
      isbn,
      read_date,
      memo,
    }: {
      isbn: string;
      read_date?: string;
      memo?: string;
    }) => PatchBookInfo(isbn, { read_date, memo }),

    onSuccess: () => {
      alert('수정되었습니다');
    },
    onError: () => {
      alert('수정에 실패했습니다');
    },
  });
};

export default usePatchBookInfo;
