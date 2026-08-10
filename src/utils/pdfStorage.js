const PREFIX = "edurwanda_pdf_";
const RECENT_KEY = "edurwanda_recent_pdfs";

export function savePdfProgress(fileUrl, data) {
  localStorage.setItem(PREFIX + fileUrl, JSON.stringify(data));
}

export function getPdfProgress(fileUrl) {
  const data = localStorage.getItem(PREFIX + fileUrl);
  return data ? JSON.parse(data) : null;
}

// 🔥 track recently opened PDFs
export function addRecentPdf(fileUrl) {
  let recent = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];

  recent = recent.filter((p) => p !== fileUrl);
  recent.unshift(fileUrl);

  if (recent.length > 10) recent.pop();

  localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
}

export function getRecentPdfs() {
  return JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
}