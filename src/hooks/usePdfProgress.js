import { useEffect, useState } from "react";

const STORAGE_KEY = "edurwanda_pdf_progress";

export function usePdfProgress(fileUrl) {
  const [progress, setProgress] = useState({
    page: 1,
    scale: 1,
    dark: false,
    bookmarks: [],
  });

  // LOAD saved progress
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const data = JSON.parse(saved);

      if (data.fileUrl === fileUrl) {
        setProgress(data);
      }
    }
  }, [fileUrl]);

  // SAVE progress automatically
  const updateProgress = (newData) => {
    const updated = { ...progress, ...newData, fileUrl };

    setProgress(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return {
    progress,
    setPage: (page) => updateProgress({ page }),
    setScale: (scale) => updateProgress({ scale }),
    toggleDark: () => updateProgress({ dark: !progress.dark }),
    addBookmark: (page) => {
      const bookmarks = [...progress.bookmarks, page];
      updateProgress({ bookmarks });
    },
    removeBookmark: (page) => {
      const bookmarks = progress.bookmarks.filter((p) => p !== page);
      updateProgress({ bookmarks });
    },
  };
}