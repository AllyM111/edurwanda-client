import { useEffect, useMemo, useState } from "react";

import ExamGrid from "../../components/exams/ExamGrid";
import ExamFilter from "../../components/exams/ExamFilter";

import { getExams } from "../../services/examService";

export default function Exams() {
  const [exams, setExams] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");

  // =====================================
  // LOAD EXAMS
  // =====================================

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getExams();

      setExams(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("LOAD EXAMS ERROR:", err);

      setExams([]);

      setError(
        err?.response?.data?.message ||
          "Unable to load exams. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // FILTER EXAMS
  // =====================================

  const filteredExams = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return exams.filter((exam) => {
      const title = String(exam?.title || "").toLowerCase();
      const examSubject = String(exam?.subject || "").toLowerCase();
      const examLevel = String(exam?.level || "");
      const examYear = String(exam?.year || "");

      const matchesSearch =
        searchValue === "" ||
        title.includes(searchValue) ||
        examSubject.includes(searchValue) ||
        examLevel.toLowerCase().includes(searchValue) ||
        examYear.includes(searchValue);

      const matchesLevel =
        level === "" || examLevel === level;

      const matchesSubject =
        subject === "" || exam?.subject === subject;

      const matchesYear =
        year === "" ||
        examYear === String(year);

      return (
        matchesSearch &&
        matchesLevel &&
        matchesSubject &&
        matchesYear
      );
    });
  }, [exams, search, level, subject, year]);

  // =====================================
  // CLEAR FILTERS
  // =====================================

  const clearFilters = () => {
    setSearch("");
    setLevel("");
    setSubject("");
    setYear("");
  };

  const hasFilters =
    search.trim() !== "" ||
    level !== "" ||
    subject !== "" ||
    year !== "";

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          py-12
        "
        style={{
          backgroundColor: "var(--background-color)",
          color: "var(--text-color)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER SKELETON */}

          <div className="animate-pulse">
            <div
              className="
                h-10
                w-72
                rounded-xl
              "
              style={{
                backgroundColor: "var(--card-color)",
              }}
            />

            <div
              className="
                mt-4
                h-5
                w-full
                max-w-2xl
                rounded-lg
              "
              style={{
                backgroundColor: "var(--card-color)",
              }}
            />
          </div>

          {/* FILTER SKELETON */}

          <div
            className="
              mt-10
              h-32
              rounded-2xl
              animate-pulse
            "
            style={{
              backgroundColor: "var(--card-color)",
              border: "1px solid var(--border-color)",
            }}
          />

          {/* CARD SKELETONS */}

          <div
            className="
              mt-10
              grid
              sm:grid-cols-2
              lg:grid-cols-3
              gap-8
            "
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="
                  h-80
                  rounded-2xl
                  animate-pulse
                "
                style={{
                  backgroundColor: "var(--card-color)",
                  border: "1px solid var(--border-color)",
                }}
              />
            ))}
          </div>

        </div>
      </div>
    );
  }

  // =====================================
  // PAGE
  // =====================================

  return (
    <div
      className="
        min-h-screen
        py-10
        md:py-14
      "
      style={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="mb-10">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

            <div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-semibold
                  mb-4
                "
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--primary-color) 12%, transparent)",
                  color: "var(--primary-color)",
                }}
              >
                🇷🇼 Rwanda National Examinations
              </div>

              <h1
                className="
                  text-3xl
                  md:text-4xl
                  lg:text-5xl
                  font-extrabold
                  tracking-tight
                "
                style={{
                  color: "var(--primary-color)",
                }}
              >
                Past Exams 📝
              </h1>

              <p
                className="
                  mt-4
                  text-base
                  md:text-lg
                  max-w-3xl
                  leading-relaxed
                "
                style={{
                  color: "var(--muted-color)",
                }}
              >
                Practice Rwanda national examination papers,
                review previous questions, and prepare with
                exams organized by level, subject, and year.
              </p>

            </div>

            {/* TOTAL */}

            <div
              className="
                rounded-2xl
                px-6
                py-5
                min-w-[180px]
              "
              style={{
                backgroundColor: "var(--card-color)",
                border: "1px solid var(--border-color)",
              }}
            >

              <p
                className="text-sm font-medium"
                style={{
                  color: "var(--muted-color)",
                }}
              >
                Available Exams
              </p>

              <p
                className="
                  text-3xl
                  font-extrabold
                  mt-1
                "
                style={{
                  color: "var(--primary-color)",
                }}
              >
                {exams.length}
              </p>

            </div>

          </div>

        </div>


        {/* =====================================
            ERROR
        ===================================== */}

        {error && (
          <div
            className="
              rounded-2xl
              p-5
              mb-8
            "
            style={{
              backgroundColor: "var(--card-color)",
              border: "1px solid var(--border-color)",
            }}
          >

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">

              <div className="text-3xl">
                ⚠️
              </div>

              <div className="flex-1">

                <h3 className="font-bold">
                  Unable to load exams
                </h3>

                <p
                  className="mt-1 text-sm"
                  style={{
                    color: "var(--muted-color)",
                  }}
                >
                  {error}
                </p>

              </div>

              <button
                type="button"
                onClick={loadExams}
                className="
                  px-5
                  py-2.5
                  rounded-xl
                  text-white
                  font-semibold
                "
                style={{
                  backgroundColor:
                    "var(--primary-color)",
                }}
              >
                Try Again
              </button>

            </div>

          </div>
        )}


        {/* =====================================
            FILTERS
        ===================================== */}

        <ExamFilter
          search={search}
          setSearch={setSearch}
          level={level}
          setLevel={setLevel}
          subject={subject}
          setSubject={setSubject}
          year={year}
          setYear={setYear}
        />


        {/* =====================================
            RESULTS SUMMARY
        ===================================== */}

        <div
          className="
            mt-8
            mb-8
            rounded-2xl
            p-5
          "
          style={{
            backgroundColor: "var(--card-color)",
            border: "1px solid var(--border-color)",
          }}
        >

          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-4
            "
          >

            <div>

              <p
                className="
                  text-xl
                  font-bold
                "
                style={{
                  color: "var(--primary-color)",
                }}
              >
                {filteredExams.length}{" "}
                {filteredExams.length === 1
                  ? "Exam"
                  : "Exams"}{" "}
                Found
              </p>

              <p
                className="mt-1 text-sm"
                style={{
                  color: "var(--muted-color)",
                }}
              >
                Browse exams by level, subject,
                year, or search term.
              </p>

            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="
                  px-5
                  py-2.5
                  rounded-xl
                  font-semibold
                  transition
                  hover:opacity-80
                "
                style={{
                  backgroundColor:
                    "var(--background-color)",
                  color:
                    "var(--primary-color)",
                  border:
                    "1px solid var(--border-color)",
                }}
              >
                Clear Filters
              </button>
            )}

          </div>

        </div>


        {/* =====================================
            NO RESULTS
        ===================================== */}

        {filteredExams.length === 0 && !error && (

          <div
            className="
              rounded-3xl
              p-12
              md:p-20
              text-center
            "
            style={{
              backgroundColor: "var(--card-color)",
              border: "1px solid var(--border-color)",
            }}
          >

            <div className="text-6xl mb-5">
              📝
            </div>

            <h2
              className="
                text-2xl
                font-bold
              "
            >
              No exams found
            </h2>

            <p
              className="
                mt-3
                max-w-lg
                mx-auto
              "
              style={{
                color: "var(--muted-color)",
              }}
            >
              We couldn't find any exams matching
              your current search or filters.
              Try changing your selection.
            </p>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="
                  mt-6
                  px-6
                  py-3
                  rounded-xl
                  text-white
                  font-semibold
                "
                style={{
                  backgroundColor:
                    "var(--primary-color)",
                }}
              >
                Reset Filters
              </button>
            )}

          </div>

        )}


        {/* =====================================
            EXAMS GRID
        ===================================== */}

        {filteredExams.length > 0 && (
          <ExamGrid
            exams={filteredExams}
          />
        )}

      </div>
    </div>
  );
}