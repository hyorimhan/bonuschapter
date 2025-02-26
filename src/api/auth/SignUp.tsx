const default_url = import.meta.env.VITE_API_URL.replace(/\/+$/, '');
export const handleSignUp = async ({
  username,
  id,
  password,
}: {
  username: string;
  id: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${default_url}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, id, password }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || '회원가입 실패');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
