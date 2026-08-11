
import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";

import {
  getBookById,
  getBooks,
} from "../../services/bookService";

import ProPdfReader from "../../components/pdf/ProPdfReader";

// ======================================
// API BASE URL
// ======================================

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://edurwanda-server-production.up.railway.app";

// ======================================
// BOOK DETAIL
// ======================================

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readerOpen, setReaderOpen] = useState(false);

  // ======================================
  // LOAD BOOK
  // ======================================

  useEffect(() => {
    loadBook();
    loadBooks();
  }, [id]);

  // ======================================
  // GET SINGLE BOOK
  // ======================================

  async function loadBook() {
    try {
      const data = await getBookById(id);

      setBook(data);
    } catch (error) {
      console.error("BOOK ERROR:", error);
      setBook(null);
    } finally {
      setLoading(false);
    }
  }

  // ======================================
  // GET ALL BOOKS
  // ======================================

  async function loadBooks() {
    try {
      const data = await getBooks();

      setBooks(data || []);
    } catch (error) {
      console.error("BOOKS ERROR:", error);
      setBooks([]);
    }
  }

  // ======================================
  // OPEN PDF READER
  // ======================================

  async function openReader() {
    if (!book?.pdfUrl) {
      alert("PDF file unavailable");
      return;
    }

    try {
      await fetch(
        `${API_URL}/api/reader/view/${book.id}`,
        {
          method: "POST",
        }
      );
    } catch (error) {
      console.error("VIEW ERROR:", error);
    }

    setReaderOpen(true);
  }

  // ======================================
  // DOWNLOAD BOOK
  // ======================================

  function downloadBook() {
    if (!book?.id) {
      alert("Book ID is missing");
      return;
    }

    const downloadUrl =
      `https://edurwanda-server-production.up.railway.app/api/books/download/${book.id}`;

    console.log("DOWNLOAD URL:", downloadUrl);

    window.location.href = downloadUrl;
  }

  // ======================================
  // LOADING
  // ======================================

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          text-xl
        "
        style={{
          backgroundColor: "var(--background-color)",
          color: "var(--text-color)",
        }}
      >
        Loading book...
      </div>
    );
  }

  // ======================================
  // BOOK NOT FOUND
  // ======================================

  if (!book) {
    return (
      <div
        className="
          min-h-screen
          flex
          flex-col
          items-center
          justify-center
          text-center
          px-6
        "
        style={{
          backgroundColor: "var(--background-color)",
          color: "var(--text-color)",
        }}
      >
        <h2 className="text-3xl font-bold">
          Book Not Found
        </h2>

        <button
          onClick={() => navigate("/books")}
          className="
            mt-6
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-xl
            transition
          "
        >
          Back To Books
        </button>
      </div>
    );
  }

  // ======================================
  // RELATED BOOKS
  // ======================================

  const relatedBooks = books.filter(
    (item) =>
      String(item.id) !== String(book.id) &&
      (
        (book.subject &&
          item.subject === book.subject) ||
        (book.level &&
          item.level === book.level)
      )
  );

  // ======================================
  // RENDER
  // ======================================

  return (
    <div
      className="
        min-h-screen
        py-10
      "
      style={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* ======================================
            BACK BUTTON
        ====================================== */}

        <button
          onClick={() => navigate("/books")}
          className="
            mb-8
            bg-gray-900
            hover:bg-gray-800
            text-white
            px-5
            py-2
            rounded-lg
            transition
          "
        >
          ← Back
        </button>

        {/* ======================================
            BOOK INFORMATION
        ====================================== */}

        <div className="grid lg:grid-cols-2 gap-10">

          {/* ======================================
              COVER
          ====================================== */}

          <div>
            <img
              src={
                book.coverUrl ||
                "https://via.placeholder.com/400x550"
              }
              alt={book.title}
              className="
                rounded-2xl
                shadow-xl
                w-full
                max-h-[700px]
                object-cover
              "
            />
          </div>

          {/* ======================================
              DETAILS
          ====================================== */}

          <div>

            {/* CATEGORY */}

            {book.category && (
              <span
                className="
                  inline-block
                  bg-blue-100
                  text-blue-700
                  px-4
                  py-1
                  rounded-full
                  text-sm
                "
              >
                {book.category}
              </span>
            )}

            {/* TITLE */}

            <h1
              className="
                text-4xl
                font-bold
                mt-5
              "
            >
              {book.title}
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-6
                leading-8
              "
              style={{
                color: "var(--muted-color)",
              }}
            >
              {book.description ||
                "No description available."}
            </p>

            {/* META INFORMATION */}

            <div
              className="
                grid
                grid-cols-2
                gap-5
                mt-8
              "
            >

              {/* AUTHOR */}

              <div>
                <strong>Author</strong>

                <p
                  style={{
                    color: "var(--muted-color)",
                  }}
                >
                  {book.author || "-"}
                </p>
              </div>

              {/* SUBJECT */}

              <div>
                <strong>Subject</strong>

                <p
                  style={{
                    color: "var(--muted-color)",
                  }}
                >
                  {book.subject || "-"}
                </p>
              </div>

              {/* LEVEL */}

              <div>
                <strong>Level</strong>

                <p
                  style={{
                    color: "var(--muted-color)",
                  }}
                >
                  {book.level || "-"}
                </p>
              </div>

              {/* YEAR */}

              <div>
                <strong>Year</strong>

                <p
                  style={{
                    color: "var(--muted-color)",
                  }}
                >
                  {book.year || "-"}
                </p>
              </div>

            </div>

            {/* ======================================
                ACTION BUTTONS
            ====================================== */}

            <div
              className="
                flex
                gap-4
                mt-10
                flex-wrap
              "
            >

              {/* READ */}

              <button
                onClick={openReader}
                disabled={!book.pdfUrl}
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  disabled:bg-gray-400
                  disabled:cursor-not-allowed
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  font-semibold
                  transition
                "
              >
                📖 Read Book
              </button>

              {/* DOWNLOAD */}

              <button
                onClick={downloadBook}
                disabled={!book.id}
                className="
                  bg-green-600
                  hover:bg-green-700
                  disabled:bg-gray-400
                  disabled:cursor-not-allowed
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  font-semibold
                  transition
                "
              >
                ⬇ Download PDF
              </button>

            </div>

            {/* ======================================
                STATISTICS
            ====================================== */}

            <div
              className="
                mt-6
                flex
                gap-6
                flex-wrap
              "
              style={{
                color: "var(--muted-color)",
              }}
            >
              <p>
                👁 {book.views || 0} views
              </p>

              <p>
                ⬇ {book.downloads || 0} downloads
              </p>
            </div>

          </div>

        </div>

        {/* ======================================
            RELATED BOOKS
        ====================================== */}

        {relatedBooks.length > 0 && (
          <div className="mt-20">

            <h2 className="text-3xl font-bold mb-8">
              Related Books
            </h2>

            <div
              className="
                grid
                sm:grid-cols-2
                lg:grid-cols-4
                gap-6
              "
            >

              {relatedBooks.map((item) => (

                <Link
                  key={item.id}
                  to={`/books/${item.id}`}
                  className="
                    rounded-2xl
                    shadow
                    overflow-hidden
                    transition
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                  style={{
                    backgroundColor:
                      "var(--card-color)",
                  }}
                >

                  <img
                    src={
                      item.coverUrl ||
                      "https://via.placeholder.com/300x400"
                    }
                    alt={item.title}
                    className="
                      h-56
                      w-full
                      object-cover
                    "
                  />

                  <div className="p-5">

                    <h3 className="font-bold">
                      {item.title}
                    </h3>

                    <p
                      className="mt-1"
                      style={{
                        color: "var(--muted-color)",
                      }}
                    >
                      {item.subject || "-"}
                    </p>

                  </div>

                </Link>

              ))}

            </div>

          </div>
        )}

      </div>

      {/* ======================================
          PDF READER MODAL
      ====================================== */}

      {readerOpen && (

        <div
          className="
            fixed
            inset-0
            bg-black/90
            z-50
          "
        >

          <div
            className="
              bg-white
              w-full
              h-full
            "
          >

            {/* READER HEADER */}

            <div
              className="
                flex
                justify-between
                items-center
                p-4
                border-b
              "
            >

              <h2 className="font-bold">
                {book.title}
              </h2>

              <button
                onClick={() =>
                  setReaderOpen(false)
                }
                className="
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  px-4
                  py-2
                  rounded
                  transition
                "
              >
                Close
              </button>

            </div>

            {/* PDF READER */}

            <ProPdfReader
              fileUrl={book.pdfUrl}
              bookId={book.id}
              type="book"
            />

          </div>

        </div>

      )}

    </div>
  );
}
