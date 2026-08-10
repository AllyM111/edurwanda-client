
import { useState } from "react";
import {
  FaExclamationTriangle,
  FaTrash,
  FaTimes
} from "react-icons/fa";

export default function DeleteYoutubeModal({
  video,
  onClose,
  onConfirm
}) {
  const [deleting, setDeleting] = useState(false);

  if (!video) {
    return null;
  }

  async function handleConfirm() {
    if (deleting) {
      return;
    }

    try {
      setDeleting(true);
      await onConfirm();
    } catch (error) {
      console.error("DELETE VIDEO ERROR:", error);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "rgba(0, 0, 0, 0.65)"
      }}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl shadow-2xl"
        style={{
          background: "var(--card-color)",
          border: "1px solid var(--border-color)",
          color: "var(--text-color)"
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{
            borderBottom: "1px solid var(--border-color)"
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full"
              style={{
                background: "rgba(239, 68, 68, 0.12)",
                color: "#ef4444"
              }}
            >
              <FaExclamationTriangle />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Delete Video
              </h2>

              <p
                className="mt-1 text-sm"
                style={{
                  color: "var(--muted-color)"
                }}
              >
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="flex h-9 w-9 items-center justify-center rounded-lg transition disabled:opacity-50"
            style={{
              color: "var(--muted-color)"
            }}
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        <div className="px-6 py-6">
          <p
            className="leading-6"
            style={{
              color: "var(--muted-color)"
            }}
          >
            Are you sure you want to delete this YouTube
            video?
          </p>

          <div
            className="mt-5 rounded-xl p-4"
            style={{
              background: "var(--background-color)",
              border: "1px solid var(--border-color)"
            }}
          >
            <p
              className="line-clamp-2 font-semibold"
              style={{
                color: "var(--text-color)"
              }}
            >
              {video.title || "Untitled video"}
            </p>

            {video.channel && (
              <p
                className="mt-2 text-sm"
                style={{
                  color: "var(--muted-color)"
                }}
              >
                Channel:{" "}
                {typeof video.channel === "string"
                  ? video.channel
                  : video.channel.name ||
                    video.channel.slug ||
                    "Unknown"}
              </p>
            )}

            {video.videoUrl && (
              <p
                className="mt-2 break-all text-xs"
                style={{
                  color: "var(--muted-color)"
                }}
              >
                {video.videoUrl}
              </p>
            )}
          </div>

          <p
            className="mt-4 text-sm"
            style={{
              color: "#ef4444"
            }}
          >
            The video will be permanently removed from
            EduRwanda.
          </p>
        </div>

        <div
          className="flex flex-col-reverse justify-end gap-3 px-6 py-5 sm:flex-row"
          style={{
            borderTop: "1px solid var(--border-color)"
          }}
        >
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="rounded-xl px-5 py-3 font-semibold transition disabled:opacity-50"
            style={{
              background: "var(--background-color)",
              border: "1px solid var(--border-color)",
              color: "var(--text-color)"
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={deleting}
            className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white transition disabled:opacity-50"
            style={{
              background: "#dc2626"
            }}
          >
            <FaTrash />

            {deleting ? "Deleting..." : "Delete Video"}
          </button>
        </div>
      </div>
    </div>
  );
}
