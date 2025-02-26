const default_url = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const GetUserInfo = async () => {
  try {
    const response = await fetch(`${default_url}/api/auth/me`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('사용자 정보를 가져오지 못했습니다');
    }

    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
