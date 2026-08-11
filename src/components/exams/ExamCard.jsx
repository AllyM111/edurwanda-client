
import { Link } from "react-router-dom";

// ======================================
// API BASE URL
// ======================================

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://edurwanda-server-production.up.railway.app";

// ======================================
// EXAM CARD
// ======================================

export default function ExamCard({ exam }) {

  // ======================================
  // DOWNLOAD EXAM
  // ======================================

  const downloadExam = () => {

    if (!exam?.id) {
      alert("Exam ID missing");
      return;
    }

    const downloadUrl =
      `${API_URL}/api/exams/download/${exam.id}`;

    window.open(downloadUrl, "_blank");
  };

  // ======================================
  // RENDER
  // ======================================

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

      {/* ======================================
          EXAM HEADER
      ====================================== */}

      <div
        className="
          h-48
          flex
          items-center
          justify-center
          bg-gradient-to-br
          from-blue-600
          to-blue-800
        "
      >
        <div className="text-7xl">
          📝
        </div>
      </div>

      {/* ======================================
          CONTENT
      ====================================== */}

      <div className="p-5">

        {/* TITLE */}

        <h2
          className="
            text-xl
            font-bold
            line-clamp-2
          "
          style={{
            color: "var(--text-color)",
          }}
        >
          {exam.title || "Untitled Exam"}
        </h2>

        {/* DESCRIPTION */}

        <p
          className="mt-2 text-sm line-clamp-3"
          style={{
            color: "var(--muted-color)",
          }}
        >
          {exam.description ||
            "Rwanda national examination paper"}
        </p>

        {/* ======================================
            EXAM INFORMATION
        ====================================== */}

        <div className="mt-5 space-y-2 text-sm">

          <InfoRow
            label="Level"
            value={exam.level}
          />

          <InfoRow
            label="Subject"
            value={exam.subject}
          />

          <InfoRow
            label="Year"
            value={exam.year}
          />

        </div>

        {/* ======================================
            BUTTONS
        ====================================== */}

        <div className="grid grid-cols-2 gap-3 mt-6">

          {/* VIEW EXAM */}

          <Link
            to={`/exams/${exam.id}`}
            className="
              text-center
              py-3
              rounded-xl
              font-semibold
            "
            style={{
              backgroundColor: "var(--primary-color)",
              color: "#fff",
            }}
          >
            View Exam
          </Link>

          {/* DOWNLOAD */}

          <button
            type="button"
            onClick={downloadExam}
            className="
              py-3
              rounded-xl
              font-semibold
              bg-green-600
              hover:bg-green-700
              text-white
            "
          >
            Download
          </button>

        </div>

      </div>

    </div>
  );
}

// ======================================
// INFO ROW
// ======================================

function InfoRow({ label, value }) {

  return (
    <div className="flex justify-between gap-3">

      <span
        style={{
          color: "var(--muted-color)",
        }}
      >
        {label}
      </span>

      <strong
        className="text-right"
        style={{
          color: "var(--text-color)",
        }}
      >
        {value || "-"}
      </strong>

    </div>
  );
}
