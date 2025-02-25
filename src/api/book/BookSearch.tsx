const API_URL = 'https://dapi.kakao.com/v3/search/book';
const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;

export const BookSearch = async (query: string, page: number, size: number) => {
  try {
    const response = await fetch(
      `${API_URL}?query=${encodeURIComponent(
        query
      )}&target=title&page=${page}&size=${size}`,
      {
        method: 'GET',
        headers: {
          Authorization: `KakaoAK ${REST_API_KEY}`,
        },
      }
    );
    return (await response.json()) ?? [];
  } catch (error) {
    console.log(error);
  }
};
