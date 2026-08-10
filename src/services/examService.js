import api from "./api";


// ======================================
// GET ALL EXAMS
// ======================================

export const getExams = async () => {

    const response = await api.get("/exams");

    return response.data;

};



// ======================================
// GET SINGLE EXAM
// ======================================

export const getExamById = async (id) => {

    const response = await api.get(`/exams/${id}`);

    return response.data;

};



// ======================================
// CREATE EXAM (ADMIN)
// ======================================

export const createExam = async (formData) => {

    const response = await api.post(
        "/exams",
        formData,
        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
    );


    return response.data;

};



// ======================================
// UPDATE EXAM (ADMIN)
// ======================================

export const updateExam = async(id, data)=>{


    const response = await api.put(
        `/exams/${id}`,
        data
    );


    return response.data;

};



// ======================================
// DELETE EXAM (ADMIN)
// ======================================

export const deleteExam = async(id)=>{


    const response = await api.delete(
        `/exams/${id}`
    );


    return response.data;

};



// ======================================
// DOWNLOAD EXAM
// ======================================

export const downloadExam = async(id)=>{


    const response = await api.put(
        `/exams/${id}/download`
    );


    return response.data;

};