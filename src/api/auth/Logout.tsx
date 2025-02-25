const default_url = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const handleLogout = async () => {
  try {
    const response = await fetch(`${default_url}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
