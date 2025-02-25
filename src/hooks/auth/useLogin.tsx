import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from '../../api/auth/Login';

export const useLoginMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: handleLogin,
    onSuccess: (data) => {
      alert(data.message);
      navigate('/');
    },
    onError: (error) => {
      alert(error.message);
      navigate('/');
    },
  });
};
