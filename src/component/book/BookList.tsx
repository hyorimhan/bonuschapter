import useModal from '../../hooks/common/useModal';
import { BooksDataType, useBookStore } from '../../zustand/useBookStore';

function BookList({ searchData }: { searchData: BooksDataType }) {
  const { setBooksData } = useBookStore();
  const { openModal, ModalComponent } = useModal();

  return (
    <div className="relative">
      <div className="space-y-4">
        {searchData.documents.length > 0 && (
          <div className="grid grid-cols-5 gap-3 ">
            {searchData?.documents?.map((post) => (
              <div
                key={post.isbn}
                className="cursor-pointer p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-md"
                onClick={() => {
                  setBooksData(post);
                  openModal({
                    title: post.title,
                    content: post.authors,
                    img: post.thumbnail!,
                    form: true,
                    bookData: post,
                  });
                }}
              >
                <div className="flex flex-col items-center justify-center mt-3 text-sm text-gray-500">
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <img src={post.thumbnail!} alt="img" />
                  <span>{post.authors}</span>
                  <span>{new Date(post.datetime).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>{' '}
      {ModalComponent}
    </div>
  );
}

export default BookList;
