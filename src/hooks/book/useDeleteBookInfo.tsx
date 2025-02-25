import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import DeleteBookInfo from '../../api/book/DeleteBookInfo';

const useDeleteBookInfo = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: DeleteBookInfo,
    onSuccess: () => {
      alert('삭제 되었습니다');
      navigate('/');
    },
    onError: () => {
      alert('삭제에 실패했습니다');
      navigate('/');
    },
  });
};

export default useDeleteBookInfo;
