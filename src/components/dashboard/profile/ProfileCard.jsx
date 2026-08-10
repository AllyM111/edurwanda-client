import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const STORAGE_KEY = "edurwanda_pdf_progress";

export default function PDFReader({ file }) {
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1);
  const [fitMode, setFitMode] = useState("width");
  const [dark, setDark] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const viewerRef = useRef(null);

  // =========================
  // LOAD SAVED PROGRESS
  // =========================
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (saved && saved.file === file) {
      setScale(saved.scale ?? 1);
      setDark(saved.dark ?? false);
      setBookmarks(saved.bookmarks ?? []);
      setCurrentPage(saved.page ?? 1);

      setTimeout(() => {
        goToPage(saved.page ?? 1);
      }, 300);
    }
  }, [file]);

  // =========================
  // SAVE PROGRESS (AUTO)
  // =========================
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        file,
        page: currentPage,
        scale,
        dark,
        bookmarks,
      })
    );
  }, [file, currentPage, scale, dark, bookmarks]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);

    setTimeout(() => {
      goToPage(currentPage);
    }, 300);
  }

  // =========================
  // GO TO PAGE
  // =========================
  function goToPage(page) {
    const el = document.getElementById(`pdf-page-${page}`);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setCurrentPage(page);
    }
  }

  // =========================
  // BOOKMARK SYSTEM
  // =========================
  function addBookmark(page) {
    setBookmarks((prev) => {
      if (!prev.includes(page)) {
        return [...prev, page];
      }
      return prev;
    });
  }

  function removeBookmark(page) {
    setBookmarks((prev) => prev.filter((p) => p !== page));
  }

  // =========================
  // DOWNLOAD PDF
  // =========================
  function downloadPdf() {
    const link = document.createElement("a");
    link.href = file;
    link.download = file.split("/").pop() || "document.pdf";
    link.click();
  }

  // =========================
  // FIT WIDTH
  // =========================
  const pageWidth =
    fitMode === "width"
      ? window.innerWidth < 768
        ? 320
        : 850
      : undefined;

  return (
    <div
      className={`w-full h-full flex ${
        dark
          ? "bg-[#0f172a] text-white"
          : "bg-[#f1f5f9] text-black"
      }`}
    >

      {/* ================= SIDEBAR ================= */}
      <div
        className={`
          hidden md:flex
          w-52
          border-r
          flex-col
          overflow-y-auto
          ${
            dark
              ? "bg-[#111827] border-gray-700"
              : "bg-white border-gray-200"
          }
        `}
      >
        <div className="p-3 border-b font-bold">
          Pages
        </div>

        <div className="p-2 space-y-2">
          {Array.from({ length: numPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`
                w-full text-left p-2 rounded text-sm transition
                ${
                  dark
                    ? "hover:bg-gray-700"
                    : "hover:bg-gray-100"
                }
              `}
            >
              📄 Page {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* TOOLBAR */}
        <div
          className={`
            sticky top-0 z-50
            flex flex-wrap items-center gap-2
            px-3 py-2
            border-b shadow-sm
            ${
              dark
                ? "bg-[#111827] border-gray-700"
                : "bg-white border-gray-200"
            }
          `}
        >
          {/* ZOOM */}
          <button
            onClick={() =>
              setScale((s) => (s > 0.5 ? s - 0.1 : s))
            }
            className="px-3 py-1 rounded bg-gray-200 text-black"
          >
            −
          </button>

          <span className="text-sm font-medium">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={() => setScale((s) => s + 0.1)}
            className="px-3 py-1 rounded bg-gray-200 text-black"
          >
            +
          </button>

          {/* FIT */}
          <button
            onClick={() => setFitMode("width")}
            className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
          >
            Fit Width
          </button>

          <button
            onClick={() => setFitMode("page")}
            className="px-3 py-1 rounded bg-gray-700 text-white text-sm"
          >
            Fit Page
          </button>

          {/* DARK MODE */}
          <button
            onClick={() => setDark(!dark)}
            className="px-3 py-1 rounded bg-black text-white text-sm"
          >
            {dark ? "☀ Light" : "🌙 Dark"}
          </button>

          {/* DOWNLOAD */}
          <button
            onClick={downloadPdf}
            className="px-3 py-1 rounded bg-green-600 text-white text-sm"
          >
            ⬇ Download
          </button>
        </div>

        {/* PDF AREA */}
        <div
          ref={viewerRef}
          className="flex-1 overflow-y-auto p-3 sm:p-6"
        >
          <div className="flex flex-col items-center">

            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="p-10 text-center">
                  Loading PDF...
                </div>
              }
              error={
                <div className="p-10 text-center text-red-500">
                  Failed to load PDF
                </div>
              }
            >
              {Array.from({ length: numPages }, (_, i) => (
                <div
                  key={i}
                  id={`pdf-page-${i + 1}`}
                  className={`
                    mb-8 rounded-xl overflow-hidden shadow-2xl border
                    ${
                      dark
                        ? "bg-[#1e293b] border-gray-700"
                        : "bg-white border-gray-200"
                    }
                  `}
                >
                  <Page
                    pageNumber={i + 1}
                    width={pageWidth}
                    scale={fitMode === "page" ? scale : 1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />

                  {/* FOOTER */}
                  <div
                    className={`
                      flex justify-between items-center
                      px-4 py-2 text-sm
                      ${
                        dark
                          ? "bg-[#0f172a]"
                          : "bg-gray-50"
                      }
                    `}
                  >
                    <span>
                      Page {i + 1} / {numPages}
                    </span>

                    <div className="flex gap-3">
                      <button
                        onClick={() => addBookmark(i + 1)}
                        className="text-blue-500"
                      >
                        🔖 Bookmark
                      </button>

                      <button
                        onClick={() => removeBookmark(i + 1)}
                        className="text-red-500"
                      >
                        ❌ Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Document>

          </div>
        </div>
      </div>

      {/* ================= BOOKMARK PANEL ================= */}
      <div
        className={`
          hidden lg:flex
          w-52
          border-l
          flex-col
          overflow-y-auto
          ${
            dark
              ? "bg-[#111827] border-gray-700"
              : "bg-white border-gray-200"
          }
        `}
      >
        <div className="p-3 border-b font-bold">
          Bookmarks
        </div>

        <div className="p-2 space-y-2">
          {bookmarks.length === 0 && (
            <p className="text-sm text-gray-500">
              No bookmarks yet
            </p>
          )}

          {bookmarks.map((b, i) => (
            <button
              key={i}
              onClick={() => goToPage(b)}
              className="w-full text-left p-2 rounded bg-green-600 text-white text-sm"
            >
              📌 Page {b}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}