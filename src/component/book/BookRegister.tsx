import BaseLayout from '../layout/BaseLayout';
import Input from '../common/Input';
import { useForm } from 'react-hook-form';
import Pagination from '../layout/Pagination';
import { useState } from 'react';
import Button from '../common/Button';
import { useSearchBooks } from '../../hooks/book/useSearchBooks';
import BookList from './BookList';

interface SearchData {
  bookSearch: string;
}

function BookRegister() {
  const { register, handleSubmit } = useForm<SearchData>({
    mode: 'onChange',
  });
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { searchData } = useSearchBooks(query, currentPage, itemsPerPage);

  const handleSearch = (data: SearchData): void => {
    setQuery(data.bookSearch);
    setCurrentPage(1);
  };

  return (
    <BaseLayout>
      <form onSubmit={handleSubmit(handleSearch)}>
        <Input
          type="text"
          id="search"
          label="책 검색"
          register={register('bookSearch')}
        />
        <Button name="검색" />
      </form>
      <BookList searchData={searchData} />

      {searchData.meta.total_count && (
        <Pagination
          totalItems={searchData.meta.total_count || 0}
          onPageChange={setCurrentPage}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      )}
    </BaseLayout>
  );
}

export default BookRegister;
