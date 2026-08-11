
import BookCard from "./BookCard";

export default function BookGrid({
  books,
  onDownload,
}) {
  // ======================================
  // NO BOOKS
  // ======================================

  if (!books || !books.length) {
    return (
      <div
        className="
          text-center
          py-20
          text-gray-500
        "
      >
        No books found 📚
      </div>
    );
  }

  // ======================================
  // BOOK GRID
  // ======================================

  return (
    <div
      className="
        grid
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-6
      "
    >
      {books.map((book) => (
        <BookCard
          key={book.id || book.title}
          book={book}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
}
