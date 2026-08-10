
import { Link } from "react-router-dom";

export default function ExamCard({ exam }) {
  const hasCover =
    exam?.coverUrl &&
    typeof exam.coverUrl === "string" &&
    exam.coverUrl.trim() !== "";

  function handleDownload(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!exam?.id) {
      alert("Exam unavailable");
      return;
    }

    window.location.href = `/api/exams/download/${exam.id}`;
  }

  return (
    <div
      className="
        rounded-2xl
        overflow-hidden
        shadow-lg
        border
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
        group
      "
      style={{
        backgroundColor: "var(--card-color)",
        borderColor: "var(--border-color)",
      }}
    >
      {/* =====================================
          EXAM COVER
      ===================================== */}

      <Link to={`/exams/${exam?.id}`} className="block">
        <div
          className="
            relative
            h-72
            overflow-hidden
          "
          style={{
            backgroundColor: "var(--background-color)",
          }}
        >
          {hasCover ? (
            <img
              src={exam.coverUrl}
              alt={exam.title || "Exam"}
              className="
                w-full
                h-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-110
              "
              onError={(event) => {
                event.currentTarget.style.display = "none";

                const fallback =
                  event.currentTarget.parentElement?.querySelector(
                    ".exam-image-fallback"
                  );

                if (fallback) {
                  fallback.style.display = "flex";
                }
              }}
            />
          ) : null}

          {/* =====================================
              FALLBACK EXAM ICON
          ===================================== */}

          <div
            className="
              exam-image-fallback
              absolute
              inset-0
              flex
              flex-col
              items-center
              justify-center
              text-center
              p-6
            "
            style={{
              display: hasCover ? "none" : "flex",
              backgroundColor: "var(--card-color)",
            }}
          >
            <div
              className="
                w-28
                h-28
                rounded-3xl
                flex
                items-center
                justify-center
                text-6xl
                shadow-lg
              "
              style={{
                backgroundColor: "var(--primary-color)",
              }}
            >
              📝
            </div>

            <h3
              className="
                mt-5
                text-lg
                font-bold
                line-clamp-2
              "
              style={{
                color: "var(--text-color)",
              }}
            >
              {exam?.title || "Examination Paper"}
            </h3>

            <p
              className="mt-2 text-sm"
              style={{
                color: "var(--muted-color)",
              }}
            >
              Rwanda National Examination
            </p>
          </div>

          {/* =====================================
              TYPE BADGE
          ===================================== */}

          <div className="absolute top-4 left-4">
            <span
              className="
                px-3
                py-1
                rounded-full
                text-xs
                font-semibold
                shadow
              "
              style={{
                backgroundColor: "rgba(255,255,255,0.92)",
                color: "var(--primary-color)",
              }}
            >
              {exam?.type === "PAST_EXAM" ? "Past Exam" : "Exam"}
            </span>
          </div>

          {/* =====================================
              YEAR
          ===================================== */}

          {exam?.year && (
            <div className="absolute top-4 right-4">
              <span
                className="
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-semibold
                  text-white
                  shadow
                "
                style={{
                  backgroundColor: "rgba(0,0,0,0.65)",
                }}
              >
                {exam.year}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* =====================================
          CONTENT
      ===================================== */}

      <div className="p-5">
        <Link to={`/exams/${exam?.id}`} className="block">
          <h3
            className="
              text-xl
              font-bold
              line-clamp-2
            "
            style={{
              color: "var(--text-color)",
            }}
          >
            {exam?.title || "Untitled Examination"}
          </h3>

          <p
            className="
              mt-3
              text-sm
              line-clamp-2
            "
            style={{
              color: "var(--muted-color)",
            }}
          >
            {exam?.description
              ? exam.description.length > 100
                ? `${exam.description.substring(0, 100)}...`
                : exam.description
              : "Past examination paper"}
          </p>

          {/* =====================================
              DETAILS
          ===================================== */}

          <div
            className="
              mt-5
              space-y-2
              text-sm
            "
          >
            <div className="flex justify-between gap-3">
              <span
                style={{
                  color: "var(--muted-color)",
                }}
              >
                Level
              </span>

              <strong
                style={{
                  color: "var(--text-color)",
                }}
              >
                {exam?.level || "-"}
              </strong>
            </div>

            <div className="flex justify-between gap-3">
              <span
                style={{
                  color: "var(--muted-color)",
                }}
              >
                Subject
              </span>

              <strong
                style={{
                  color: "var(--text-color)",
                }}
              >
                {exam?.subject || "-"}
              </strong>
            </div>

            <div className="flex justify-between gap-3">
              <span
                style={{
                  color: "var(--muted-color)",
                }}
              >
                Year
              </span>

              <strong
                style={{
                  color: "var(--text-color)",
                }}
              >
                {exam?.year || "-"}
              </strong>
            </div>
          </div>
        </Link>

        {/* =====================================
            ACTIONS
        ===================================== */}

        <div
          className="
            grid
            grid-cols-2
            gap-3
            mt-6
          "
        >
          <Link
            to={`/exams/${exam?.id}`}
            className="
              py-3
              rounded-xl
              text-center
              font-semibold
              text-white
              transition
              hover:opacity-90
              hover:-translate-y-0.5
            "
            style={{
              backgroundColor: "var(--primary-color)",
            }}
          >
            View Exam
          </Link>

          <button
            type="button"
            onClick={handleDownload}
            className="
              py-3
              rounded-xl
              font-semibold
              text-white
              bg-green-600
              hover:bg-green-700
              transition
              hover:-translate-y-0.5
            "
          >
            ⬇ Download
          </button>
        </div>
      </div>
    </div>
  );
}
