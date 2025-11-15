export default function Pagination({ page, setPage, totalPages }) {
  return (
    <div className="flex justify-center mt-6 gap-2">
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-[#C122ED] text-white' : 'bg-gray-200'}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}