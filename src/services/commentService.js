
import api from "./api";

// ======================================================
// GET COMMENTS
// ======================================================

export const getComments = async () => {
  const response = await api.get("/comments");

  return response.data;
};

// ======================================================
// CREATE COMMENT
// ======================================================

export const createComment = async (
  content
) => {
  const response = await api.post(
    "/comments",
    {
      content,
    }
  );

  return response.data;
};

// ======================================================
// DELETE COMMENT
// ======================================================

export const deleteComment = async (
  commentId
) => {
  const response = await api.delete(
    `/comments/${commentId}`
  );

  return response.data;
};
