import { useForm } from 'react-hook-form';
import {
  ID_VALIDATION,
  PASSWORD_CONFIRM_VALIDATION,
  PASSWORD_VALIDATION,
  USER_NAME_VALIDATION,
} from '../../constants/auth/authValidation';
import BaseLayout from '../layout/BaseLayout';
import Button from '../common/Button';
import Input from '../common/Input';
import { useSignUpMutation } from '../../hooks/auth/useSignup';

function SignUp() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const password = watch('password');

  const signupMutation = useSignUpMutation();

  return (
    <BaseLayout>
      <form
        onSubmit={handleSubmit(({ id, username, password }) =>
          signupMutation.mutate({ id, username, password })
        )}
      >
        <Input
          label="닉네임"
          id="username"
          type="text"
          register={register('username', USER_NAME_VALIDATION)}
          error={errors.username?.message as string | undefined}
        />
        <Input
          label="아이디"
          id="id"
          type="text"
          register={register('id', ID_VALIDATION)}
          error={errors.id?.message as string | undefined}
        />
        <Input
          label="비밀번호"
          id="password"
          type="password"
          register={register('password', PASSWORD_VALIDATION)}
          error={errors.password?.message as string | undefined}
        />
        <Input
          label="비밀번호 확인"
          id="passwordConfirm"
          type="password"
          register={register(
            'passwordConfirm',
            PASSWORD_CONFIRM_VALIDATION(password)
          )}
          error={errors.passwordConfirm?.message as string | undefined}
        />

        <Button name="회원가입" type="submit" className="btn-blue" />
      </form>
    </BaseLayout>
  );
}

export default SignUp;
