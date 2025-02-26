import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from '../../api/auth/Login';

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleLogin,
    onSuccess: () => {
      alert('로그인 되었습니다');
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      navigate('/');
    },
    onError: () => {
      alert('로그인에 실패했습니다');
      navigate('/');
    },
  });
};
