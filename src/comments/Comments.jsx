
import React, {
  useEffect,
  useState,
} from "react";

import {
  getComments,
  createComment,
  deleteComment,
} from "../../services/commentService";

const Comments = () => {
  // ==================================================
  // STATE
  // ==================================================

  const [comments, setComments] =
    useState([]);

  const [content, setContent] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [loadingComments, setLoadingComments] =
    useState(true);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // ==================================================
  // LOAD COMMENTS
  // ==================================================

  const loadComments = async () => {
    try {
      setLoadingComments(true);
      setError("");

      console.log(
        "🔥 Loading comments..."
      );

      const response =
        await getComments();

      console.log(
        "🔥 Comments response:",
        response
      );

      setComments(
        response?.data || []
      );
    } catch (error) {
      console.error(
        "🔥 LOAD COMMENTS ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load comments."
      );
    } finally {
      setLoadingComments(false);
    }
  };

  // ==================================================
  // LOAD ON PAGE OPEN
  // ==================================================

  useEffect(() => {
    loadComments();
  }, []);

  // ==================================================
  // INPUT CHANGE
  // ==================================================

  const handleChange = (event) => {
    setContent(event.target.value);

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  };

  // ==================================================
  // SEND COMMENT
  // ==================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(
      "🔥🔥🔥 SEND COMMENT BUTTON CLICKED"
    );

    console.log(
      "Comment content:",
      content
    );

    setError("");
    setSuccess("");

    const cleanContent =
      content.trim();

    // ----------------------------------------------
    // VALIDATION
    // ----------------------------------------------

    if (!cleanContent) {
      setError(
        "Please write a comment."
      );

      return;
    }

    if (cleanContent.length > 2000) {
      setError(
        "Comment cannot exceed 2000 characters."
      );

      return;
    }

    // ----------------------------------------------
    // SEND
    // ----------------------------------------------

    try {
      setLoading(true);

      console.log(
        "🔥 Sending comment to server..."
      );

      const response =
        await createComment(
          cleanContent
        );

      console.log(
        "🔥 CREATE COMMENT RESPONSE:",
        response
      );

      // ------------------------------------------
      // ADD NEW COMMENT
      // ------------------------------------------

      if (response?.data) {
        setComments(
          (previousComments) => [
            response.data,
            ...previousComments,
          ]
        );
      }

      // ------------------------------------------
      // CLEAR INPUT
      // ------------------------------------------

      setContent("");

      // ------------------------------------------
      // SUCCESS
      // ------------------------------------------

      setSuccess(
        "Comment submitted successfully."
      );

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error(
        "🔥 CREATE COMMENT ERROR:",
        error
      );

      console.error(
        "Status:",
        error.response?.status
      );

      console.error(
        "Server response:",
        error.response?.data
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to submit comment."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==================================================
  // DELETE COMMENT
  // ==================================================

  const handleDelete = async (
    commentId
  ) => {
    if (!commentId) {
      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this comment?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteComment(
        commentId
      );

      setComments(
        (previousComments) =>
          previousComments.filter(
            (comment) =>
              comment.id !==
              commentId
          )
      );

      setSuccess(
        "Comment deleted successfully."
      );

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error(
        "DELETE COMMENT ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete comment."
      );
    }
  };

  // ==================================================
  // DATE
  // ==================================================

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    try {
      return new Date(
        date
      ).toLocaleString();
    } catch {
      return "";
    }
  };

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <section className="w-full">

      {/* ============================================
          HEADER
      ============================================ */}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Comments
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Share your thoughts with other EduRwanda users.
        </p>
      </div>

      {/* ============================================
          SUCCESS
      ============================================ */}

      {success && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400">
          {success}
        </div>
      )}

      {/* ============================================
          ERROR
      ============================================ */}

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {/* ============================================
          COMMENT FORM
      ============================================ */}

      <form
        onSubmit={handleSubmit}
        className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900"
      >

        <label
          htmlFor="comment-content"
          className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
        >
          Write a comment
        </label>

        <textarea
          id="comment-content"
          name="comment"
          value={content}
          onChange={handleChange}
          placeholder="Write your comment..."
          maxLength={2000}
          rows={4}
          disabled={loading}
          className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
        />

        {/* FORM FOOTER */}

        <div className="mt-3 flex items-center justify-between">

          <span className="text-xs text-gray-500 dark:text-gray-400">
            {content.length}/2000
          </span>

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Sending..."
              : "Send Comment"}
          </button>

        </div>
      </form>

      {/* ============================================
          COMMENT COUNT
      ============================================ */}

      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        {comments.length}{" "}
        {comments.length === 1
          ? "Comment"
          : "Comments"}
      </h3>

      {/* ============================================
          LOADING
      ============================================ */}

      {loadingComments && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
          Loading comments...
        </div>
      )}

      {/* ============================================
          EMPTY
      ============================================ */}

      {!loadingComments &&
        comments.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
            No comments yet. Be the first to comment.
          </div>
        )}

      {/* ============================================
          COMMENTS
      ============================================ */}

      {!loadingComments &&
        comments.length > 0 && (
          <div className="space-y-4">

            {comments.map(
              (comment) => (
                <article
                  key={comment.id}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900"
                >

                  <div className="flex items-start gap-3">

                    {/* AVATAR */}

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">

                      {comment.user?.avatar ? (
                        <img
                          src={
                            comment
                              .user
                              .avatar
                          }
                          alt={
                            comment.user
                              ?.name ||
                            "User"
                          }
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        (
                          comment
                            .user
                            ?.name ||
                          "U"
                        )
                          .charAt(0)
                          .toUpperCase()
                      )}

                    </div>

                    {/* CONTENT */}

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-start justify-between gap-2">

                        <div>

                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {comment.user
                              ?.name ||
                              "EduRwanda User"}
                          </h4>

                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(
                              comment.createdAt
                            )}
                          </p>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              comment.id
                            )
                          }
                          className="cursor-pointer text-xs font-medium text-red-500 hover:text-red-700 dark:text-red-400"
                        >
                          Delete
                        </button>

                      </div>

                      <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-gray-700 dark:text-gray-300">
                        {comment.content}
                      </p>

                    </div>

                  </div>

                </article>
              )
            )}

          </div>
        )}

    </section>
  );
};

export default Comments;
