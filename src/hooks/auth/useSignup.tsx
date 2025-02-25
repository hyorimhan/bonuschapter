import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { handleSignUp } from '../../api/auth/SignUp';

export const useSignUpMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: handleSignUp,
    onSuccess: () => {
      alert('회원가입 되었습니다');
      navigate('/');
    },
    onError: () => {
      alert('회원가입에 실패했습니다');
      navigate('/');
    },
  });
};
