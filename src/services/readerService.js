import api from "./api";


// ======================================
// CREATE READER KEY
// ======================================

function readerKey(id, type="book"){

  return `${type}-${id}`;

}



// ======================================
// SAVE READING PROGRESS
// ======================================

export async function saveProgress({
  bookId,
  page,
  progress,
  type="book"
}) {


  const key = readerKey(bookId,type);


  const response = await api.post(
    "/reader/progress",
    {
      bookId:key,
      page,
      progress
    }
  );


  return response.data.data;

}






// ======================================
// GET READING PROGRESS
// ======================================

export async function getProgress(
  bookId,
  type="book"
){

  const key = readerKey(
    bookId,
    type
  );


  const response = await api.get(
    `/reader/progress/${key}`
  );


  return response.data.data;

}






// ======================================
// ADD BOOKMARK
// ======================================

export async function addBookmark({
  bookId,
  page,
  type="book"
}){


  const key = readerKey(
    bookId,
    type
  );


  const response = await api.post(
    "/reader/bookmark",
    {
      bookId:key,
      page
    }
  );


  return response.data.data;

}






// ======================================
// GET BOOKMARKS
// ======================================

export async function getBookmarks(
  bookId,
  type="book"
){


  const key = readerKey(
    bookId,
    type
  );


  const response = await api.get(
    `/reader/bookmarks/${key}`
  );


  return response.data.data;

}






// ======================================
// DELETE BOOKMARK
// ======================================

export async function deleteBookmark(id){


  const response =
  await api.delete(
    `/reader/bookmark/${id}`
  );


  return response.data;

}







// ======================================
// ADD NOTE
// ======================================

export async function addNote({
  bookId,
  page,
  content,
  type="book"
}){


  const key = readerKey(
    bookId,
    type
  );



  const response =
  await api.post(
    "/reader/note",
    {
      bookId:key,
      page,
      content
    }
  );


  return response.data.data;


}







// ======================================
// GET NOTES
// ======================================

export async function getNotes(
  bookId,
  type="book"
){


  const key =
  readerKey(
    bookId,
    type
  );



  const response =
  await api.get(
    `/reader/notes/${key}`
  );


  return response.data.data;


}







// ======================================
// DELETE NOTE
// ======================================

export async function deleteNote(id){


  const response =
  await api.delete(
    `/reader/note/${id}`
  );


  return response.data;

}







// ======================================
// RECORD VIEW
// ======================================

export async function recordView(
  bookId,
  type="book"
){


  const key =
  readerKey(
    bookId,
    type
  );



  const response =
  await api.post(
    `/reader/view/${key}`
  );


  return response.data;


}







// ======================================
// DOWNLOAD PDF
// ======================================

export function downloadBook(bookId){


  window.open(
    `/api/reader/download/${bookId}`,
    "_blank"
  );


}







// ======================================
// GET READER STATS
// ======================================

export async function getReaderStats(
  bookId,
  type="book"
){


  const key =
  readerKey(
    bookId,
    type
  );



  const response =
  await api.get(
    `/reader/stats/${key}`
  );


  return response.data.data;


}