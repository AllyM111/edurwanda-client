
import {
  useEffect,
  useState,
} from "react";

import {
  getExams,
  createExam,
  deleteExam,
} from "../../services/examService";

import ExamsTable from "../../components/dashboard/exams/ExamsTable";
import EditExamModal from "../../components/dashboard/exams/EditExamModal";

import {
  examLevels,
  examYears,
} from "../../data/examOptions";

export default function AdminExams() {
  // ======================================
  // EXAMS
  // ======================================

  const [exams, setExams] = useState([]);

  const [loading, setLoading] = useState(true);

  // ======================================
  // FILTERS
  // ======================================

  const [search, setSearch] = useState("");

  const [filterLevel, setFilterLevel] = useState("");

  const [filterSubject, setFilterSubject] = useState("");

  const [filterYear, setFilterYear] = useState("");

  // ======================================
  // EDIT
  // ======================================

  const [selectedExam, setSelectedExam] = useState(null);

  // ======================================
  // UPLOAD FORM
  // ======================================

  const [form, setForm] = useState({
    title: "",
    level: "",
    subject: "",
    year: "",
    pdf: null,
  });

  // ======================================
  // LOAD EXAMS
  // ======================================

  const loadExams = async () => {
    try {
      setLoading(true);

      const data = await getExams();

      setExams(data || []);
    } catch (error) {
      console.log(
        "EXAMS ERROR:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // INITIAL LOAD
  // ======================================

  useEffect(() => {
    loadExams();
  }, []);

  // ======================================
  // HANDLE FORM INPUT
  // ======================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,

      // Reset subject when level changes
      ...(name === "level"
        ? {
            subject: "",
          }
        : {}),
    }));
  };

  // ======================================
  // HANDLE PDF
  // ======================================

  const handleFile = (e) => {
    const file =
      e.target.files?.[0] || null;

    console.log(
      "SELECTED PDF:",
      file?.name
    );

    setForm((prev) => ({
      ...prev,
      pdf: file,
    }));
  };

  // ======================================
  // UPLOAD EXAM
  // ======================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // -------------------------------
    // VALIDATION
    // -------------------------------

    if (!form.title.trim()) {
      alert("Please enter the exam title.");
      return;
    }

    if (!form.level) {
      alert("Please select a level.");
      return;
    }

    if (!form.subject) {
      alert("Please select a subject.");
      return;
    }

    if (!form.year) {
      alert("Please select a year.");
      return;
    }

    if (!form.pdf) {
      alert("Please select a PDF file.");
      return;
    }

    // -------------------------------
    // CHECK PDF
    // -------------------------------

    if (
      form.pdf.type !==
      "application/pdf"
    ) {
      alert("Only PDF files are allowed.");
      return;
    }

    try {
      const data = new FormData();

      data.append(
        "title",
        form.title.trim()
      );

      data.append(
        "level",
        form.level
      );

      data.append(
        "subject",
        form.subject
      );

      data.append(
        "year",
        form.year
      );

      data.append(
        "pdf",
        form.pdf
      );

      console.log(
        "UPLOADING EXAM:",
        {
          title: form.title,
          level: form.level,
          subject: form.subject,
          year: form.year,
          pdf: form.pdf.name,
        }
      );

      await createExam(data);

      // -------------------------------
      // RESET FORM
      // -------------------------------

      setForm({
        title: "",
        level: "",
        subject: "",
        year: "",
        pdf: null,
      });

      // Clear file input
      const fileInput =
        document.getElementById(
          "exam-pdf-input"
        );

      if (fileInput) {
        fileInput.value = "";
      }

      // Reload exams
      await loadExams();

      alert(
        "Exam uploaded successfully."
      );
    } catch (error) {
      console.log(
        "CREATE EXAM ERROR:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Failed to upload exam."
      );
    }
  };

  // ======================================
  // DELETE EXAM
  // ======================================

  const handleDelete = async (exam) => {
    if (
      !window.confirm(
        `Delete "${exam.title}"?`
      )
    ) {
      return;
    }

    try {
      await deleteExam(exam.id);

      await loadExams();
    } catch (error) {
      console.log(
        "DELETE EXAM ERROR:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Failed to delete exam."
      );
    }
  };

  // ======================================
  // FILTER SUBJECTS
  // ======================================

  const filterSubjects = filterLevel
    ? examLevels[filterLevel] || []
    : [
        ...new Set(
          Object.values(examLevels)
            .flat()
        ),
      ];

  // ======================================
  // FILTER EXAMS
  // ======================================

  const filtered = exams.filter(
    (exam) => {
      // -------------------------------
      // SEARCH
      // -------------------------------

      const searchText =
        search
          .trim()
          .toLowerCase();

      const matchesSearch =
        !searchText ||
        exam.title
          ?.toLowerCase()
          .includes(searchText);

      // -------------------------------
      // LEVEL
      // -------------------------------

      const matchesLevel =
        !filterLevel ||
        exam.level === filterLevel;

      // -------------------------------
      // SUBJECT
      // -------------------------------

      const matchesSubject =
        !filterSubject ||
        exam.subject ===
          filterSubject;

      // -------------------------------
      // YEAR
      // -------------------------------

      const matchesYear =
        !filterYear ||
        String(exam.year) ===
          String(filterYear);

      return (
        matchesSearch &&
        matchesLevel &&
        matchesSubject &&
        matchesYear
      );
    }
  );

  // ======================================
  // LOADING
  // ======================================

  if (loading) {
    return (
      <div
        className="
          p-6
          text-center
        "
        style={{
          color:
            "var(--text-color)",
        }}
      >
        Loading exams...
      </div>
    );
  }

  // ======================================
  // PAGE
  // ======================================

  return (
    <div
      className="
        space-y-6
        p-6
      "
    >
      {/* =================================
          HEADER
      ================================= */}

      <div>
        <h1
          className="
            text-2xl
            md:text-3xl
            font-bold
          "
          style={{
            color:
              "var(--text-color)",
          }}
        >
          Exams Management
        </h1>

        <p
          className="
            mt-1
            opacity-70
          "
          style={{
            color:
              "var(--text-color)",
          }}
        >
          Past Papers Questions and
          Answers
        </p>
      </div>

      {/* =================================
          UPLOAD CARD
      ================================= */}

      <div
        className="
          rounded-2xl
          shadow
          p-6
        "
        style={{
          backgroundColor:
            "var(--card-color)",
          border:
            "1px solid var(--border-color)",
        }}
      >
        <h2
          className="
            text-xl
            font-semibold
            mb-5
          "
          style={{
            color:
              "var(--text-color)",
          }}
        >
          Upload Exam PDF
        </h2>

        <form
          onSubmit={handleSubmit}
          className="
            grid
            md:grid-cols-2
            gap-4
          "
        >
          {/* TITLE */}

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Exam title"
            className="
              w-full
              p-3
              rounded-lg
              border
              outline-none
            "
            style={{
              backgroundColor:
                "var(--background-color)",
              border:
                "1px solid var(--border-color)",
              color:
                "var(--text-color)",
            }}
          />

          {/* LEVEL */}

          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            className="
              w-full
              p-3
              rounded-lg
              border
              outline-none
            "
            style={{
              backgroundColor:
                "var(--background-color)",
              border:
                "1px solid var(--border-color)",
              color:
                "var(--text-color)",
            }}
          >
            <option value="">
              Select Level
            </option>

            {Object.keys(
              examLevels
            ).map((level) => (
              <option
                key={level}
                value={level}
              >
                {level}
              </option>
            ))}
          </select>

          {/* SUBJECT */}

          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            disabled={!form.level}
            className="
              w-full
              p-3
              rounded-lg
              border
              outline-none
              disabled:opacity-50
            "
            style={{
              backgroundColor:
                "var(--background-color)",
              border:
                "1px solid var(--border-color)",
              color:
                "var(--text-color)",
            }}
          >
            <option value="">
              {form.level
                ? "Select Subject"
                : "Select Level First"}
            </option>

            {form.level &&
              (
                examLevels[
                  form.level
                ] || []
              ).map((subject) => (
                <option
                  key={subject}
                  value={subject}
                >
                  {subject}
                </option>
              ))}
          </select>

          {/* YEAR */}

          <select
            name="year"
            value={form.year}
            onChange={handleChange}
            className="
              w-full
              p-3
              rounded-lg
              border
              outline-none
            "
            style={{
              backgroundColor:
                "var(--background-color)",
              border:
                "1px solid var(--border-color)",
              color:
                "var(--text-color)",
            }}
          >
            <option value="">
              Select Year
            </option>

            {examYears.map(
              (year) => (
                <option
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              )
            )}
          </select>

          {/* PDF */}

          <input
            id="exam-pdf-input"
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleFile}
            className="
              w-full
              p-3
              rounded-lg
              border
              md:col-span-2
            "
            style={{
              backgroundColor:
                "var(--background-color)",
              border:
                "1px solid var(--border-color)",
              color:
                "var(--text-color)",
            }}
          />

          {/* UPLOAD BUTTON */}

          <div
            className="
              md:col-span-2
            "
          >
            <button
              type="submit"
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
                transition
              "
            >
              Upload Exam
            </button>
          </div>
        </form>
      </div>

      {/* =================================
          FILTER CARD
      ================================= */}

      <div
        className="
          rounded-2xl
          shadow
          p-5
        "
        style={{
          backgroundColor:
            "var(--card-color)",
          border:
            "1px solid var(--border-color)",
        }}
      >
        <div
          className="
            grid
            md:grid-cols-4
            gap-4
          "
        >
          {/* SEARCH */}

          <input
            placeholder="Search exams..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              w-full
              p-3
              rounded-xl
              border
              outline-none
            "
            style={{
              backgroundColor:
                "var(--background-color)",
              border:
                "1px solid var(--border-color)",
              color:
                "var(--text-color)",
            }}
          />

          {/* FILTER LEVEL */}

          <select
            value={filterLevel}
            onChange={(e) => {
              setFilterLevel(
                e.target.value
              );

              // Reset subject
              // when level changes
              setFilterSubject("");
            }}
            className="
              w-full
              p-3
              rounded-xl
              border
              outline-none
            "
            style={{
              backgroundColor:
                "var(--background-color)",
              border:
                "1px solid var(--border-color)",
              color:
                "var(--text-color)",
            }}
          >
            <option value="">
              All Levels
            </option>

            {Object.keys(
              examLevels
            ).map((level) => (
              <option
                key={level}
                value={level}
              >
                {level}
              </option>
            ))}
          </select>

          {/* FILTER SUBJECT */}

          <select
            value={filterSubject}
            onChange={(e) =>
              setFilterSubject(
                e.target.value
              )
            }
            className="
              w-full
              p-3
              rounded-xl
              border
              outline-none
            "
            style={{
              backgroundColor:
                "var(--background-color)",
              border:
                "1px solid var(--border-color)",
              color:
                "var(--text-color)",
            }}
          >
            <option value="">
              All Subjects
            </option>

            {filterSubjects.map(
              (subject) => (
                <option
                  key={subject}
                  value={subject}
                >
                  {subject}
                </option>
              )
            )}
          </select>

          {/* FILTER YEAR */}

          <select
            value={filterYear}
            onChange={(e) =>
              setFilterYear(
                e.target.value
              )
            }
            className="
              w-full
              p-3
              rounded-xl
              border
              outline-none
            "
            style={{
              backgroundColor:
                "var(--background-color)",
              border:
                "1px solid var(--border-color)",
              color:
                "var(--text-color)",
            }}
          >
            <option value="">
              All Years
            </option>

            {examYears.map(
              (year) => (
                <option
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              )
            )}
          </select>
        </div>

        {/* FILTER RESULTS INFO */}

        <div
          className="
            mt-4
            flex
            items-center
            justify-between
            gap-3
            flex-wrap
          "
        >
          <p
            className="
              text-sm
              opacity-70
            "
            style={{
              color:
                "var(--text-color)",
            }}
          >
            Showing{" "}
            <strong>
              {filtered.length}
            </strong>{" "}
            of{" "}
            <strong>
              {exams.length}
            </strong>{" "}
            exams
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setFilterLevel("");
              setFilterSubject("");
              setFilterYear("");
            }}
            className="
              px-4
              py-2
              rounded-lg
              border
              text-sm
              hover:bg-gray-100
              dark:hover:bg-gray-800
              transition
            "
            style={{
              border:
                "1px solid var(--border-color)",
              color:
                "var(--text-color)",
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* =================================
          EXAMS TABLE
      ================================= */}

      <ExamsTable
        exams={filtered}
        onEdit={setSelectedExam}
        onDelete={handleDelete}
      />

      {/* =================================
          EDIT MODAL
      ================================= */}

      {selectedExam && (
        <EditExamModal
          exam={selectedExam}
          close={() =>
            setSelectedExam(null)
          }
        />
      )}
    </div>
  );
}
