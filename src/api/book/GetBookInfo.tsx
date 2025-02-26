const default_url = import.meta.env.VITE_API_URL.replace(/\/+$/, '');

const GetBookInfo = async ({ pageParam = '' }) => {
  try {
    const response = await fetch(
      `${default_url}/api/books/saved?cursor=${pageParam}&limit=8`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    const data = await response.json();

    if (Array.isArray(data)) {
      return {
        books: data,
        nextCursor: data.length === 8 ? data[data.length - 1].id : null,
      };
    }

    return {
      books: data.books || [],
      nextCursor: data.nextCursor ?? null,
    };
  } catch (error) {
    console.error(error);
    return { books: [], nextCursor: null };
  }
};

export default GetBookInfo;
