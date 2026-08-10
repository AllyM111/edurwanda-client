import { createContext, useContext, useState, useEffect } from "react";

import { getBooks } from "../services/bookService";
import { getExams } from "../services/examService";

const EduContext = createContext();

export function EduProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [exams, setExams] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // =========================
  // LOAD ALL DATA
  // =========================
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [booksData, examsData] = await Promise.all([
        getBooks(),
        getExams(),
      ]);

      setBooks(Array.isArray(booksData) ? booksData : []);
      setExams(Array.isArray(examsData) ? examsData : []);
    } catch (err) {
      console.error("LOAD ERROR:", err);

      setError("Failed to load data");
      setBooks([]);
      setExams([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // =========================
  // REFRESH BOOKS + EXAMS
  // =========================
  const refreshData = async () => {
    await loadData();
  };

  return (
    <EduContext.Provider
      value={{
        books,
        setBooks,

        exams,
        setExams,

        loading,
        error,

        refreshData,
      }}
    >
      {children}
    </EduContext.Provider>
  );
}

export function useEdu() {
  return useContext(EduContext);
}