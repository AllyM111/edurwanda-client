import axios from "axios";

const API_URL = "http://localhost:5000/api/books";

export const getBooks = async () => {
  return axios.get(API_URL);
};

export const createBook = async (formData, token) => {
  return axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteBook = async (id, token) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};