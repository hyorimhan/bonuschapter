const default_url = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const DeleteBookInfo = async (isbn: string) => {
  try {
    const response = await fetch(`${default_url}/api/books/delete/${isbn}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default DeleteBookInfo;
