import { useEffect, useState } from "react";

import BookGrid from "../../components/books/BookGrid";
import BookFilter from "../../components/books/BookFilter";

import { getBooks } from "../../services/bookService";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = books.filter((book) => {
    return (
      (book.title || "")
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (level === "" || book.level === level) &&
      (subject === "" || book.subject === subject) &&
      (year === "" || String(book.year) === String(year))
    );
  });

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-xl"
        style={{
          backgroundColor: "var(--background-color)",
          color: "var(--text-color)",
        }}
      >
        Loading books...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-10"
      style={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="mb-10">

          <h1
            className="text-4xl font-bold"
            style={{
              color: "var(--primary-color)",
            }}
            
          >
            EduRwanda Books Library 📚
          </h1>

          <p
            className="mt-3 text-lg"
            style={{
              color: "var(--muted-color)",
            }}
          >
            Explore textbooks, revision books and educational learning materials.
          </p>

        </div>

        {/* Filters */}

        <BookFilter
          search={search}
          setSearch={setSearch}
          level={level}
          setLevel={setLevel}
          subject={subject}
          setSubject={setSubject}
          year={year}
          setYear={setYear}
        />

        {/* Statistics */}

        <div
          className="mt-8 mb-8 rounded-2xl p-5 shadow"
          style={{
            backgroundColor: "var(--card-color)",
            border: "1px solid var(--border-color)",
          }}
          
        >
          <h2
            className="text-lg font-semibold"
            style={{
              color: "var(--primary-color)",
            }}
          >
            {filteredBooks.length} Book
            {filteredBooks.length !== 1 ? "s" : ""} Found
          </h2>

          <p
            className="mt-1"
            style={{
              color: "var(--muted-color)",
              
            }}
          >
            Browse and read books online or download them for offline study.
          </p>
        </div>

        {/* Books */}

        <BookGrid books={filteredBooks} />

      </div>
    </div>
  );
}