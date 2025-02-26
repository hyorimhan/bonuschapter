const default_url = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const DeleteBookInfo = async (isbn: string) => {
  try {
    const response = await fetch(`${default_url}/api/books/delete/${isbn}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || '책 삭제 실패');
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default DeleteBookInfo;
