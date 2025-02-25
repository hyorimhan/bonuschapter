import { useInfoQuery } from '../../hooks/auth/useInfo';
import { useLogoutMutation } from '../../hooks/auth/useLogout';
import Button from '../common/Button';

function Header() {
  const { userInfo } = useInfoQuery();

  const logoutMutation = useLogoutMutation();

  return (
    <div className="text-3xl p-5 mx-auto  justify-between flex items-center max-w-[1280px]">
      <div className="flex-1"></div>

      <div className="flex-1 flex justify-center">
        <Button link="/">
          <img src="../../public/main2.svg" alt="main" width={150} />
        </Button>
      </div>

      <div className="flex-1 flex justify-end space-x-3">
        {userInfo ? (
          <div className="flex items-center gap-5 cursor-pointer">
            <Button
              name="로그아웃"
              onClick={logoutMutation.mutate}
              className="cursor-pointer"
            />
            <Button link="/book-register" name="책 등록" />
          </div>
        ) : (
          <>
            <Button link="/login" name="로그인" />
            <Button link="/signup" name="회원가입" />
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
