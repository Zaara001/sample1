interface Props {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  setCurrentPage,
}: Props) => {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
      {/* ✅ Showing count */}
      <p className="text-gray-500">
        Showing {start}–{end} of {totalItems} employees
      </p>

      {/* ✅ Buttons */}
      <div className="flex gap-2">
        {/* Prev */}
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-100 rounded-lg disabled:opacity-50"
        >
          ‹ Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-lg ${
              currentPage === page ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-100 rounded-lg disabled:opacity-50"
        >
          Next ›
        </button>
      </div>
    </div>
  );
};

export default Pagination;
