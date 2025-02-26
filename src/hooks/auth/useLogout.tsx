import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleLogout } from '../../api/auth/Logout';

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleLogout,
    onSuccess: async (data) => {
      alert(data.message);
      queryClient.invalidateQueries({ queryKey: 'userInfo' });
      await queryClient.refetchQueries({ queryKey: 'userInfo' });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
