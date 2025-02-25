import {
  ID_VALIDATION,
  PASSWORD_VALIDATION,
} from '../../constants/auth/authValidation';
import { useLoginMutation } from '../../hooks/auth/useLogin';
import BaseLayout from '../layout/BaseLayout';
import Button from '../common/Button';
import Input from '../common/Input';
import { useForm } from 'react-hook-form';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const loginMutation = useLoginMutation();
  return (
    <BaseLayout>
      <form
        onSubmit={handleSubmit(({ id, password }) =>
          loginMutation.mutate({ id, password })
        )}
      >
        <Input
          id="id"
          label="아이디"
          type="string"
          register={register('id', ID_VALIDATION)}
          error={errors.id?.message as string | undefined}
        />
        <Input
          id="password"
          label="비밀번호"
          type="password"
          register={register('password', PASSWORD_VALIDATION)}
          error={errors.password?.message as string | undefined}
        />
        <Button name="로그인" type="submit" className="btn-blue" />
      </form>
    </BaseLayout>
  );
}

export default Login;
