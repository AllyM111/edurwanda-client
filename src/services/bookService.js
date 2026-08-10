import api from "./api";



// ===============================
// GET ALL BOOKS
// ===============================

export const getBooks = async () => {

    const response = await api.get("/books");

    return response.data;

};





// ===============================
// GET SINGLE BOOK
// ===============================

export const getBookById = async (id) => {

    const response = await api.get(
        `/books/${id}`
    );

    return response.data;

};





// ===============================
// CREATE BOOK
// ===============================

export const createBook = async (formData) => {

    const response = await api.post(
        "/books",
        formData,
        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
    );

    return response.data;

};





// ===============================
// UPDATE BOOK
// ===============================

export const updateBook = async (id, data) => {

    const response = await api.put(
        `/books/${id}`,
        data
    );

    return response.data;

};





// ===============================
// DELETE BOOK
// ===============================

export const deleteBook = async (id) => {

    const response = await api.delete(
        `/books/${id}`
    );

    return response.data;

};