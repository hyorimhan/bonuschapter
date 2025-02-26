const default_url = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const handleLogin = async ({
  id,
  password,
}: {
  id: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${default_url}/api/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, password }),
    });
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || '로그인 실패');
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
