const default_url = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const handleLogin = async ({
  id,
  password,
}: {
  id: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${default_url}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, password }),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
