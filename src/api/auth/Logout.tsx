const default_url = import.meta.env.VITE_API_URL.replace(/\/+$/, '');

export const handleLogout = async () => {
  try {
    const response = await fetch(`${default_url}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || '로그아웃 실패');
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
