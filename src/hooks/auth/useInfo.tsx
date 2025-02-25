import { useQuery } from '@tanstack/react-query';
import { GetUserInfo } from '../../api/user/GetUserInfo';

export const useInfoQuery = () => {
  const {
    data: userInfo,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: GetUserInfo,
  });

  return { userInfo, isPending, isError };
};
