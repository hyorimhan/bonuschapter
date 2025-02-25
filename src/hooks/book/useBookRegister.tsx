import { useMutation } from '@tanstack/react-query';
import { BookRegister } from '../../api/book/BookRegister';

const useBookRegisterMutation = () => {
  return useMutation({
    mutationFn: BookRegister,
    onSuccess: () => {
      alert('등록되었습니다');
    },
    onError: () => {
      alert('등록에 실패했습니다');
    },
  });
};

export default useBookRegisterMutation;
