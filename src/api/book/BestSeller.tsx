const default_url = import.meta.env.VITE_API_URL.replace(/\/+$/, '');

export const getRecommendedBooks = async () => {
  try {
    const response = await fetch(`${default_url}/api/recommended-books`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`서버 응답 오류: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('❌ 응답이 JSON이 아닙니다.');
    }
    const data = await response.json();
    return data?.books?.slice(0, 10);
  } catch (error) {
    console.error('추천도서 데이터를 불러오는 중 오류 발생:', error);
    return null;
  }
};
