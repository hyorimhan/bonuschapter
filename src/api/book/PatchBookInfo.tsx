const default_url = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const PatchBookInfo = async (
  isbn: string,
  { read_date, memo }: { read_date?: string; memo?: string }
) => {
  try {
    const response = await fetch(`${default_url}/api/books/update/${isbn}`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({ read_date, memo }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update book');
    }

    return await response.json();
  } catch (error) {
    console.error('📌 PATCH 요청 중 오류 발생:', error);
  }
};

export default PatchBookInfo;
