export const ID_VALIDATION = {
  required: '아이디는 필수입니다',
  minLength: {
    value: 5,
    message: '아이디는 최소 5글자 이상이어야 합니다',
  },
  maxLength: {
    value: 20,
    message: '아이디는 최대 20글자 이하여야 합니다',
  },
};

export const PASSWORD_VALIDATION = {
  required: '비밀번호는 필수입니다',
  minLength: {
    value: 8,
    message: '비밀번호는 최소 8글자 이상이어야 합니다',
  },
  maxLength: {
    value: 20,
    message: '비밀번호는 최대 20글자 이하여야 합니다',
  },
};

export const PASSWORD_CONFIRM_VALIDATION = (password: string) => ({
  required: '비밀번호 확인은 필수입니다',
  validate: (value: string) =>
    value === password || '비밀번호가 일치하지 않습니다',
});

export const USER_NAME_VALIDATION = {
  required: '닉네임은 필수입니다',
  minLength: {
    value: 3,
    message: '닉네임은 최소 3글자 이상이어야 합니다',
  },
  maxLength: {
    value: 10,
    message: '닉네임은 최대 10글자 이하여야 합니다',
  },
};
