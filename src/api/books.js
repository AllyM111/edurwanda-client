
import api from "./api";

// ======================================
// GET ALL BOOKS
// ======================================

export const getBooks = async () => {
  const response = await api.get("/books");

  return response.data?.data || response.data || [];
};

// ======================================
// GET BOOK BY ID
// ======================================

export const getBookById = async (id) => {
  const response = await api.get(`/books/${id}`);

  return response.data?.data || response.data;
};

// ======================================
// CREATE BOOK
// ======================================

export const createBook = async (
  formData,
  token
) => {
  const response = await api.post(
    "/books",
    formData,
    {
      headers: {
        ...(token
          ? {
              Authorization:
                `Bearer ${token}`,
            }
          : {}),
      },
    }
  );

  return response.data?.data || response.data;
};

// ======================================
// UPDATE BOOK
// ======================================

export const updateBook = async (
  id,
  formData,
  token
) => {
  const response = await api.put(
    `/books/${id}`,
    formData,
    {
      headers: {
        ...(token
          ? {
              Authorization:
                `Bearer ${token}`,
            }
          : {}),
      },
    }
  );

  return response.data?.data || response.data;
};

// ======================================
// DELETE BOOK
// ======================================

export const deleteBook = async (
  id,
  token
) => {
  const response = await api.delete(
    `/books/${id}`,
    {
      headers: {
        ...(token
          ? {
              Authorization:
                `Bearer ${token}`,
            }
          : {}),
      },
    }
  );

  return response.data;
};
