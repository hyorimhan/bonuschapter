import { useMemo } from 'react';
import Button from '../common/Button';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const visitedPages = useMemo(() => {
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        type="button"
        name="<"
        disabled={currentPage === 1}
      />

      <div className="flex gap-1">
        {visitedPages.map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            name={page.toString()}
            className={`${
              page === currentPage ? 'text-blue-500 ' : ''
            } cursor-pointer`}
          />
        ))}
      </div>

      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        type="button"
        name=">"
        disabled={currentPage >= totalPages}
      />
    </div>
  );
};

export default Pagination;
