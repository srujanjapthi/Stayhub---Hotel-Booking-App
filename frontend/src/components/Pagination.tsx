import { ChevronLeft, ChevronRight } from "lucide-react";

export type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: Props) => {
  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center">
      <ul className="flex items-center gap-2">
        <li>
          <button
            className={`min-w-9 sm:min-w-10 aspect-[1/1] p-2 rounded-md bg-gray-50 border border-gray-300 ${
              page === 1 ? "opacity-50 cursor-default" : "cursor-pointer"
            }`}
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft />
          </button>
        </li>
        {pageNumbers.map((number, index) => (
          <li key={index}>
            <button
              className={`min-w-9 sm:min-w-10 aspect-[1/1] p-2 rounded-md bg-gray-100 border border-gray-300 ${
                page === number ? "bg-gray-200" : ""
              }`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            className={`min-w-9 sm:min-w-10 aspect-[1/1] p-2 rounded-md bg-gray-50 border border-gray-300 ${
              page === pages ? "opacity-50 cursor-default" : "cursor-pointer"
            }`}
            disabled={page === pages}
            onClick={() => onPageChange(page + 1)}
          >
            <ChevronRight />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
