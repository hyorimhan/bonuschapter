const default_url = import.meta.env.VITE_API_URL || 'http://localhost:3000';
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
    const response = await fetch(`${default_url}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, id, password }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
