
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getBooks } from "../../services/bookService";
import { getExams } from "../../services/examService";
import { getYoutubeChannels } from "../../services/youtubeChannelService";

export default function Home() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [exams, setExams] = useState([]);
  const [channels, setChannels] = useState([]);

  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingExams, setLoadingExams] = useState(true);
  const [loadingChannels, setLoadingChannels] = useState(true);

  const [search, setSearch] = useState("");

  // ==========================================
  // SUBJECTS
  // ==========================================

  const categories = [
    {
      title: "Mathematics",
      icon: "📐",
      query: "Mathematics",
    },
    {
      title: "Physics",
      icon: "⚛️",
      query: "Physics",
    },
    {
      title: "Biology",
      icon: "🧬",
      query: "Biology",
    },
    {
      title: "Software Engineering",
      icon: "💻",
      query: "Software Engineering",
    },
  ];

  // ==========================================
  // LOAD HOME DATA
  // ==========================================

  useEffect(() => {
    loadBooks();
    loadExams();
    loadChannels();
  }, []);

  // ==========================================
  // LOAD BOOKS
  // ==========================================

  const loadBooks = async () => {
    try {
      setLoadingBooks(true);

      const data = await getBooks();

      setBooks(
        Array.isArray(data)
          ? data.slice(0, 4)
          : []
      );
    } catch (error) {
      console.error("LOAD BOOKS ERROR:", error);
      setBooks([]);
    } finally {
      setLoadingBooks(false);
    }
  };

  // ==========================================
  // LOAD EXAMS
  // ==========================================

  const loadExams = async () => {
    try {
      setLoadingExams(true);

      const data = await getExams();

      setExams(
        Array.isArray(data)
          ? data.slice(0, 3)
          : []
      );
    } catch (error) {
      console.error("LOAD EXAMS ERROR:", error);
      setExams([]);
    } finally {
      setLoadingExams(false);
    }
  };

  // ==========================================
  // LOAD YOUTUBE CHANNELS
  // ==========================================

  const loadChannels = async () => {
    try {
      setLoadingChannels(true);

      const data = await getYoutubeChannels();

      setChannels(
        Array.isArray(data)
          ? data.filter(
              (channel) => channel.active !== false
            )
          : []
      );
    } catch (error) {
      console.error(
        "LOAD YOUTUBE CHANNELS ERROR:",
        error
      );

      setChannels([]);
    } finally {
      setLoadingChannels(false);
    }
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const handleSearch = () => {
    const value = search.trim();

    if (!value) {
      return;
    }

    navigate(
      `/search?q=${encodeURIComponent(value)}`
    );
  };

  // ==========================================
  // SUBJECT SEARCH
  // ==========================================

  const handleSubjectSearch = (subject) => {
    navigate(
      `/search?q=${encodeURIComponent(subject)}`
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
      }}
    >

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          text-white
        "
        style={{
          backgroundColor: "var(--primary-color)",
        }}
      >

        {/* Decorative background */}

        <div
          className="
            absolute
            -top-24
            -right-24
            w-72
            h-72
            rounded-full
            bg-white/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-32
            -left-20
            w-80
            h-80
            rounded-full
            bg-white/10
            blur-3xl
          "
        />

        <div
          className="
            relative
            max-w-7xl
            mx-auto
            px-6
            py-14
            md:py-18
            grid
            lg:grid-cols-[1.15fr_0.85fr]
            gap-10
            items-center
          "
        >

          {/* ==========================================
              HERO LEFT
          ========================================== */}

          <div>

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-white/10
                border
                border-white/20
                text-sm
                font-medium
                mb-5
              "
            >
              <span>🇷🇼</span>

              <span>
                Rwanda Digital Learning Platform
              </span>
            </div>


            <h1
              className="
                text-4xl
                sm:text-5xl
                lg:text-6xl
                font-extrabold
                tracking-tight
                leading-[1.05]
              "
            >
              Learn.
              <br />

              <span className="text-white/90">
                Prepare.
              </span>

              <br />

              <span className="text-white/75">
                Succeed.
              </span>
            </h1>


            <p
              className="
                mt-5
                max-w-2xl
                text-base
                md:text-lg
                leading-relaxed
                text-white/80
              "
            >
              Access Rwanda's books, national
              examinations, educational resources,
              technology tutorials and educational
              media — all in one modern learning
              platform.
            </p>


            {/* CTA */}

            <div
              className="
                mt-7
                flex
                flex-wrap
                gap-3
              "
            >

              <Link
                to="/books"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-6
                  py-3
                  font-bold
                  shadow-lg
                  transition
                  hover:-translate-y-1
                  hover:shadow-xl
                "
                style={{
                  color:
                    "var(--primary-color)",
                }}
              >
                📚 Explore Books
              </Link>


              <Link
                to="/exams"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-white/40
                  bg-white/10
                  px-6
                  py-3
                  font-bold
                  backdrop-blur-sm
                  transition
                  hover:bg-white
                  hover:text-black
                "
              >
                📝 Practice Exams
              </Link>

            </div>


            {/* Quick statistics */}

            <div
              className="
                mt-8
                flex
                flex-wrap
                gap-x-8
                gap-y-4
              "
            >

              <div>
                <div className="text-2xl font-bold">
                  1000+
                </div>

                <div className="text-xs text-white/65">
                  Learning Resources
                </div>
              </div>


              <div
                className="
                  hidden
                  sm:block
                  w-px
                  h-10
                  bg-white/20
                "
              />


              <div>
                <div className="text-2xl font-bold">
                  500+
                </div>

                <div className="text-xs text-white/65">
                  Past Exams
                </div>
              </div>


              <div
                className="
                  hidden
                  sm:block
                  w-px
                  h-10
                  bg-white/20
                "
              />


              <div>
                <div className="text-2xl font-bold">
                  Free
                </div>

                <div className="text-xs text-white/65">
                  For Learners
                </div>
              </div>

            </div>

          </div>


          {/* ==========================================
              HERO RIGHT
          ========================================== */}

          <div className="relative">

            <div
              className="
                rounded-[2rem]
                bg-white/10
                border
                border-white/20
                backdrop-blur-xl
                p-5
                shadow-2xl
              "
            >

              {/* Main card */}

              <div
                className="
                  rounded-2xl
                  bg-white
                  p-6
                  shadow-xl
                "
                style={{
                  color:
                    "var(--text-color)",
                }}
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-6
                  "
                >

                  <div>

                    <p
                      className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-wider
                      "
                      style={{
                        color:
                          "var(--muted-color)",
                      }}
                    >
                      EduRwanda
                    </p>

                    <h2
                      className="
                        text-2xl
                        font-bold
                        mt-1
                      "
                      style={{
                        color:
                          "var(--primary-color)",
                      }}
                    >
                      Learning Hub
                    </h2>

                  </div>


                  <div
                    className="
                      w-12
                      h-12
                      rounded-2xl
                      flex
                      items-center
                      justify-center
                      text-2xl
                    "
                    style={{
                      backgroundColor:
                        "var(--primary-color)",
                    }}
                  >
                    🎓
                  </div>

                </div>


                {/* Learning resources */}

                <div className="grid grid-cols-2 gap-3">

                  <Link
                    to="/books"
                    className="
                      rounded-xl
                      p-4
                      transition
                      hover:-translate-y-1
                    "
                    style={{
                      backgroundColor:
                        "var(--background-color)",
                    }}
                  >

                    <div className="text-2xl">
                      📚
                    </div>

                    <h3 className="font-bold mt-2">
                      Books
                    </h3>

                    <p
                      className="text-xs mt-1"
                      style={{
                        color:
                          "var(--muted-color)",
                      }}
                    >
                      Study materials
                    </p>

                  </Link>


                  <Link
                    to="/exams"
                    className="
                      rounded-xl
                      p-4
                      transition
                      hover:-translate-y-1
                    "
                    style={{
                      backgroundColor:
                        "var(--background-color)",
                    }}
                  >

                    <div className="text-2xl">
                      📝
                    </div>

                    <h3 className="font-bold mt-2">
                      Exams
                    </h3>

                    <p
                      className="text-xs mt-1"
                      style={{
                        color:
                          "var(--muted-color)",
                      }}
                    >
                      Practice papers
                    </p>

                  </Link>


                  <Link
                    to="/youtube"
                    className="
                      rounded-xl
                      p-4
                      transition
                      hover:-translate-y-1
                    "
                    style={{
                      backgroundColor:
                        "var(--background-color)",
                    }}
                  >

                    <div className="text-2xl">
                      🎥
                    </div>

                    <h3 className="font-bold mt-2">
                      YouTube
                    </h3>

                    <p
                      className="text-xs mt-1"
                      style={{
                        color:
                          "var(--muted-color)",
                      }}
                    >
                      Educational channels
                    </p>

                  </Link>


                  <div
                    className="
                      rounded-xl
                      p-4
                    "
                    style={{
                      backgroundColor:
                        "var(--background-color)",
                    }}
                  >

                    <div className="text-2xl">
                      🚀
                    </div>

                    <h3 className="font-bold mt-2">
                      Future
                    </h3>

                    <p
                      className="text-xs mt-1"
                      style={{
                        color:
                          "var(--muted-color)",
                      }}
                    >
                      Growing every day
                    </p>

                  </div>

                </div>


                {/* Bottom message */}

                <div
                  className="
                    mt-5
                    rounded-xl
                    p-4
                    flex
                    items-center
                    gap-3
                  "
                  style={{
                    backgroundColor:
                      "var(--primary-color)",
                    color: "white",
                  }}
                >

                  <div className="text-2xl">
                    🇷🇼
                  </div>

                  <div>

                    <p className="font-semibold text-sm">
                      Built for learners
                    </p>

                    <p className="text-xs text-white/75">
                      Learn anywhere, anytime.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          SEARCH
      ===================================================== */}

      <section className="relative -mt-6 z-10">

        <div className="max-w-5xl mx-auto px-6">

          <div
            className="
              rounded-2xl
              p-3
              shadow-2xl
              flex
              flex-col
              sm:flex-row
              gap-3
            "
            style={{
              backgroundColor:
                "var(--card-color)",

              border:
                "1px solid var(--muted-color)",
            }}
          >

            <div
              className="
                flex-1
                flex
                items-center
                gap-3
                px-4
              "
            >

              <span className="text-xl">
                🔍
              </span>

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search books, exams, subjects..."
                className="
                  w-full
                  bg-transparent
                  outline-none
                  py-3
                "
              />

            </div>


            <button
              type="button"
              onClick={handleSearch}
              className="
                px-7
                py-3
                rounded-xl
                text-white
                font-semibold
                transition
                hover:-translate-y-0.5
              "
              style={{
                backgroundColor:
                  "var(--primary-color)",
              }}
            >
              Search
            </button>

          </div>

        </div>

      </section>


      {/* =====================================================
          SUBJECTS
      ===================================================== */}

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-end
              md:justify-between
              gap-4
              mb-8
            "
          >

            <div>

              <p
                className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-wider
                "
                style={{
                  color:
                    "var(--primary-color)",
                }}
              >
                Start Learning
              </p>

              <h2
                className="
                  text-3xl
                  md:text-4xl
                  font-bold
                  mt-2
                "
              >
                Explore Subjects
              </h2>

              <p
                className="mt-2"
                style={{
                  color:
                    "var(--muted-color)",
                }}
              >
                Find resources by subject and start
                learning faster.
              </p>

            </div>

          </div>


          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-5
            "
          >

            {categories.map((item) => (

              <button
                key={item.title}
                type="button"
                onClick={() =>
                  handleSubjectSearch(item.query)
                }
                className="
                  group
                  text-left
                  rounded-2xl
                  p-6
                  transition
                  hover:-translate-y-2
                  hover:shadow-xl
                "
                style={{
                  backgroundColor:
                    "var(--card-color)",

                  border:
                    "1px solid var(--muted-color)",
                }}
              >

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    text-3xl
                    transition
                    group-hover:scale-110
                  "
                  style={{
                    backgroundColor:
                      "var(--background-color)",
                  }}
                >
                  {item.icon}
                </div>

                <h3
                  className="
                    mt-5
                    font-bold
                    text-lg
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="mt-2 text-sm"
                  style={{
                    color:
                      "var(--muted-color)",
                  }}
                >
                  Explore resources →
                </p>

              </button>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURED BOOKS
      ===================================================== */}

      <section className="pb-20">

        <div className="max-w-7xl mx-auto px-6">

          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:justify-between
              sm:items-end
              gap-4
              mb-10
            "
          >

            <div>

              <p
                className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-wider
                "
                style={{
                  color:
                    "var(--primary-color)",
                }}
              >
                Study Materials
              </p>

              <h2
                className="
                  text-3xl
                  md:text-4xl
                  font-bold
                  mt-2
                "
              >
                📚 Featured Books
              </h2>

              <p
                className="mt-2"
                style={{
                  color:
                    "var(--muted-color)",
                }}
              >
                Latest educational books uploaded
                to EduRwanda.
              </p>

            </div>


            <Link
              to="/books"
              className="font-semibold"
              style={{
                color:
                  "var(--primary-color)",
              }}
            >
              View All →
            </Link>

          </div>


          {/* BOOK LOADING */}

          {loadingBooks && (

            <div
              className="
                grid
                md:grid-cols-2
                lg:grid-cols-4
                gap-6
              "
            >

              {[1, 2, 3, 4].map((item) => (

                <div
                  key={item}
                  className="
                    rounded-2xl
                    h-80
                    animate-pulse
                  "
                  style={{
                    backgroundColor:
                      "var(--card-color)",
                  }}
                />

              ))}

            </div>

          )}


          {/* NO BOOKS */}

          {!loadingBooks &&
            books.length === 0 && (

              <div
                className="
                  rounded-2xl
                  py-16
                  text-center
                "
                style={{
                  backgroundColor:
                    "var(--card-color)",

                  border:
                    "1px solid var(--muted-color)",
                }}
              >

                <div className="text-5xl">
                  📚
                </div>

                <p className="text-xl font-semibold mt-4">
                  No books uploaded yet.
                </p>

              </div>

            )}


          {/* BOOKS */}

          {!loadingBooks &&
            books.length > 0 && (

              <div
                className="
                  grid
                  md:grid-cols-2
                  lg:grid-cols-4
                  gap-6
                "
              >

                {books.map((book) => (

                  <Link
                    key={book.id}
                    to={`/books/${book.id}`}
                    className="
                      group
                      rounded-2xl
                      overflow-hidden
                      shadow-md
                      transition
                      hover:-translate-y-2
                      hover:shadow-xl
                    "
                    style={{
                      backgroundColor:
                        "var(--card-color)",

                      border:
                        "1px solid var(--muted-color)",
                    }}
                  >

                    <div
                      className="
                        h-52
                        overflow-hidden
                        bg-gray-100
                      "
                    >

                      <img
                        src={
                          book.coverUrl ||
                          "/images/book-placeholder.png"
                        }
                        alt={book.title}
                        className="
                          w-full
                          h-full
                          object-cover
                          group-hover:scale-105
                          transition
                          duration-500
                        "
                      />

                    </div>


                    <div className="p-5">

                      <h3
                        className="
                          font-bold
                          text-lg
                          line-clamp-2
                        "
                      >
                        {book.title}
                      </h3>

                      <p
                        className="mt-2 text-sm"
                        style={{
                          color:
                            "var(--muted-color)",
                        }}
                      >
                        {book.level ||
                          "Student Book"}
                      </p>

                    </div>

                  </Link>

                ))}

              </div>

            )}

        </div>

      </section>


      {/* =====================================================
          EXAMS
      ===================================================== */}

      <section
        className="py-20"
        style={{
          backgroundColor:
            "var(--card-color)",
        }}
      >

        <div className="max-w-7xl mx-auto px-6">

          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:justify-between
              sm:items-end
              gap-4
              mb-10
            "
          >

            <div>

              <p
                className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-wider
                "
                style={{
                  color:
                    "var(--primary-color)",
                }}
              >
                Exam Preparation
              </p>

              <h2
                className="
                  text-3xl
                  md:text-4xl
                  font-bold
                  mt-2
                "
              >
                📝 Latest Exams
              </h2>

              <p
                className="mt-2"
                style={{
                  color:
                    "var(--muted-color)",
                }}
              >
                Practice Rwanda national
                examinations.
              </p>

            </div>


            <Link
              to="/exams"
              className="font-semibold"
              style={{
                color:
                  "var(--primary-color)",
              }}
            >
              View All →
            </Link>

          </div>


          {/* LOADING */}

          {loadingExams && (

            <div
              className="
                grid
                md:grid-cols-3
                gap-6
              "
            >

              {[1, 2, 3].map((item) => (

                <div
                  key={item}
                  className="
                    h-52
                    rounded-2xl
                    animate-pulse
                  "
                  style={{
                    backgroundColor:
                      "var(--background-color)",
                  }}
                />

              ))}

            </div>

          )}


          {/* NO EXAMS */}

          {!loadingExams &&
            exams.length === 0 && (

              <div
                className="
                  text-center
                  py-16
                "
              >

                <div className="text-5xl">
                  📝
                </div>

                <p className="mt-4 text-xl font-semibold">
                  No exams available yet.
                </p>

              </div>

            )}


          {/* EXAMS */}

          {!loadingExams &&
            exams.length > 0 && (

              <div
                className="
                  grid
                  md:grid-cols-3
                  gap-6
                "
              >

                {exams.map((exam) => (

                  <Link
                    key={exam.id}
                    to={`/exams/${exam.id}`}
                    className="
                      group
                      rounded-2xl
                      p-6
                      shadow-md
                      transition
                      hover:-translate-y-2
                      hover:shadow-xl
                    "
                    style={{
                      backgroundColor:
                        "var(--background-color)",

                      border:
                        "1px solid var(--muted-color)",
                    }}
                  >

                    <div
                      className="
                        w-14
                        h-14
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        text-3xl
                      "
                      style={{
                        backgroundColor:
                          "var(--card-color)",
                      }}
                    >
                      📝
                    </div>

                    <h3
                      className="
                        font-bold
                        text-xl
                        mt-5
                        line-clamp-2
                      "
                    >
                      {exam.title}
                    </h3>

                    <p
                      className="mt-3"
                      style={{
                        color:
                          "var(--muted-color)",
                      }}
                    >
                      {exam.level ||
                        "National Examination"}
                    </p>

                    <div
                      className="
                        mt-5
                        font-semibold
                      "
                      style={{
                        color:
                          "var(--primary-color)",
                      }}
                    >
                      Practice Exam →
                    </div>

                  </Link>

                ))}

              </div>

            )}

        </div>

      </section>


      {/* =====================================================
          YOUTUBE CHANNELS
      ===================================================== */}

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div
            className="
              flex
              flex-col
              md:flex-row
              md:justify-between
              md:items-end
              gap-5
              mb-10
            "
          >

            <div className="max-w-3xl">

              <p
                className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-wider
                "
                style={{
                  color:
                    "var(--primary-color)",
                }}
              >
                Educational Media
              </p>

              <h2
                className="
                  text-3xl
                  md:text-4xl
                  font-bold
                  mt-2
                "
              >
                🎥 Discover Educational YouTube Channels
              </h2>

              <p
                className="mt-3 leading-relaxed"
                style={{
                  color:
                    "var(--muted-color)",
                }}
              >
                Discover educational YouTube channels
                from Rwanda and beyond. EduRwanda welcomes
                teachers, educators, developers,
                cybersecurity experts, students,
                musicians, and creators who share
                useful knowledge and educational content.
              </p>

              <p
                className="mt-2 font-medium"
                style={{
                  color:
                    "var(--text-color)",
                }}
              >
                Have an educational YouTube channel?
                Submit it to EduRwanda and let more
                learners discover your content.
              </p>

            </div>


            <Link
              to="/youtube"
              className="
                inline-flex
                items-center
                gap-2
                font-semibold
                whitespace-nowrap
              "
              style={{
                color:
                  "var(--primary-color)",
              }}
            >
              Explore Channels →
            </Link>

          </div>


          {/* LOADING */}

          {loadingChannels && (

            <div
              className="
                grid
                md:grid-cols-2
                lg:grid-cols-3
                gap-6
              "
            >

              {[1, 2, 3].map((item) => (

                <div
                  key={item}
                  className="
                    h-80
                    rounded-3xl
                    animate-pulse
                  "
                  style={{
                    backgroundColor:
                      "var(--card-color)",

                    border:
                      "1px solid var(--muted-color)",
                  }}
                />

              ))}

            </div>

          )}


          {/* NO CHANNELS */}

          {!loadingChannels &&
            channels.length === 0 && (

              <div
                className="
                  rounded-3xl
                  p-10
                  md:p-14
                  text-center
                "
                style={{
                  backgroundColor:
                    "var(--card-color)",

                  border:
                    "1px solid var(--muted-color)",
                }}
              >

                <div className="text-5xl">
                  🎥
                </div>

                <h3
                  className="
                    text-xl
                    md:text-2xl
                    font-bold
                    mt-5
                  "
                >
                  No educational channels available yet
                </h3>

                <p
                  className="
                    mt-3
                    max-w-xl
                    mx-auto
                  "
                  style={{
                    color:
                      "var(--muted-color)",
                  }}
                >
                  Educational YouTube channels will
                  appear here when they are added to
                  EduRwanda.
                </p>

              </div>

            )}


          {/* CHANNELS */}

          {!loadingChannels &&
            channels.length > 0 && (

              <div
                className="
                  grid
                  md:grid-cols-2
                  lg:grid-cols-3
                  gap-6
                "
              >

                {channels.map((channel) => (

                  <Link
                    key={channel.id}
                    to={`/youtube/${channel.slug}`}
                    className="
                      group
                      rounded-3xl
                      overflow-hidden
                      shadow-md
                      transition
                      hover:-translate-y-2
                      hover:shadow-xl
                    "
                    style={{
                      backgroundColor:
                        "var(--card-color)",

                      border:
                        "1px solid var(--muted-color)",
                    }}
                  >

                    {/* COVER */}

                    <div
                      className="
                        aspect-video
                        overflow-hidden
                      "
                    >

                      {channel.coverImage ? (

                        <img
                          src={channel.coverImage}
                          alt={channel.name}
                          className="
                            w-full
                            h-full
                            object-cover
                            group-hover:scale-105
                            transition
                            duration-500
                          "
                        />

                      ) : (

                        <div
                          className="
                            w-full
                            h-full
                            flex
                            items-center
                            justify-center
                            text-7xl
                          "
                          style={{
                            backgroundColor:
                              "var(--sidebar-color)",
                          }}
                        >
                          {channel.icon || "🎥"}
                        </div>

                      )}

                    </div>


                    {/* DETAILS */}

                    <div className="p-6">

                      <div
                        className="
                          flex
                          items-center
                          gap-4
                        "
                      >

                        {/* PROFILE */}

                        {channel.profileImage ? (

                          <img
                            src={
                              channel.profileImage
                            }
                            alt={channel.name}
                            className="
                              w-14
                              h-14
                              rounded-full
                              object-cover
                              border-4
                              border-white
                              shadow-md
                              flex-shrink-0
                            "
                          />

                        ) : (

                          <div
                            className="
                              w-14
                              h-14
                              rounded-full
                              flex
                              items-center
                              justify-center
                              text-2xl
                              flex-shrink-0
                            "
                            style={{
                              backgroundColor:
                                "var(--background-color)",
                            }}
                          >
                            {channel.icon ||
                              "🎥"}
                          </div>

                        )}


                        <div className="min-w-0">

                          <h3
                            className="
                              text-xl
                              font-bold
                              truncate
                            "
                          >
                            {channel.name}
                          </h3>

                          <p
                            className="
                              text-sm
                              truncate
                            "
                            style={{
                              color:
                                "var(--muted-color)",
                            }}
                          >
                            {channel.category ||
                              "Educational Channel"}
                          </p>

                        </div>

                      </div>


                      <p
                        className="
                          mt-4
                          line-clamp-2
                          leading-relaxed
                        "
                        style={{
                          color:
                            "var(--muted-color)",
                        }}
                      >
                        {channel.description ||
                          "Discover educational videos from this EduRwanda channel."}
                      </p>


                      <div
                        className="
                          mt-5
                          font-semibold
                        "
                        style={{
                          color:
                            "var(--primary-color)",
                        }}
                      >
                        Visit Channel →
                      </div>

                    </div>

                  </Link>

                ))}

              </div>

            )}

        </div>

      </section>


      {/* =====================================================
          WHY EDURWANDA
      ===================================================== */}

      <section
        className="py-20"
        style={{
          backgroundColor:
            "var(--card-color)",
        }}
      >

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-2xl mx-auto">

            <p
              className="
                text-sm
                font-semibold
                uppercase
                tracking-wider
              "
              style={{
                color:
                  "var(--primary-color)",
              }}
            >
              Why EduRwanda?
            </p>

            <h2
              className="
                text-3xl
                md:text-4xl
                font-bold
                mt-2
              "
            >
              Everything learners need
            </h2>

            <p
              className="mt-4"
              style={{
                color:
                  "var(--muted-color)",
              }}
            >
              A growing digital learning platform
              designed to make studying, revision and
              educational discovery easier.
            </p>

          </div>


          <div
            className="
              grid
              md:grid-cols-3
              gap-6
              mt-12
            "
          >

            {/* CARD 1 */}

            <div
              className="
                rounded-2xl
                p-8
                text-center
                shadow-md
                transition
                hover:-translate-y-2
              "
              style={{
                backgroundColor:
                  "var(--background-color)",

                border:
                  "1px solid var(--muted-color)",
              }}
            >

              <div className="text-5xl">
                📚
              </div>

              <h3
                className="
                  text-xl
                  font-bold
                  mt-5
                "
                style={{
                  color:
                    "var(--primary-color)",
                }}
              >
                Organized Resources
              </h3>

              <p
                className="mt-3 leading-relaxed"
                style={{
                  color:
                    "var(--muted-color)",
                }}
              >
                Books and past papers are organized
                to help learners find the resources
                they need quickly.
              </p>

            </div>


            {/* CARD 2 */}

            <div
              className="
                rounded-2xl
                p-8
                text-center
                shadow-md
                transition
                hover:-translate-y-2
              "
              style={{
                backgroundColor:
                  "var(--background-color)",

                border:
                  "1px solid var(--muted-color)",
              }}
            >

              <div className="text-5xl">
                🎓
              </div>

              <h3
                className="
                  text-xl
                  font-bold
                  mt-5
                "
                style={{
                  color:
                    "var(--primary-color)",
                }}
              >
                Student Friendly
              </h3>

              <p
                className="mt-3 leading-relaxed"
                style={{
                  color:
                    "var(--muted-color)",
                }}
              >
                Study online, read your books,
                practice exams and continue learning
                from any device.
              </p>

            </div>


            {/* CARD 3 */}

            <div
              className="
                rounded-2xl
                p-8
                text-center
                shadow-md
                transition
                hover:-translate-y-2
              "
              style={{
                backgroundColor:
                  "var(--background-color)",

                border:
                  "1px solid var(--muted-color)",
              }}
            >

              <div className="text-5xl">
                🚀
              </div>

              <h3
                className="
                  text-xl
                  font-bold
                  mt-5
                "
                style={{
                  color:
                    "var(--primary-color)",
                }}
              >
                Growing Platform
              </h3>

              <p
                className="mt-3 leading-relaxed"
                style={{
                  color:
                    "var(--muted-color)",
                }}
              >
                EduRwanda is continuously growing with
                new books, exams, educational channels
                and learning resources.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="py-20">

        <div className="max-w-5xl mx-auto px-6">

          <div
            className="
              rounded-3xl
              p-8
              md:p-12
              text-center
              text-white
              shadow-xl
              relative
              overflow-hidden
            "
            style={{
              backgroundColor:
                "var(--primary-color)",
            }}
          >

            <div
              className="
                absolute
                -top-20
                -right-20
                w-60
                h-60
                rounded-full
                bg-white/10
                blur-3xl
              "
            />

            <div
              className="
                absolute
                -bottom-20
                -left-20
                w-60
                h-60
                rounded-full
                bg-white/10
                blur-3xl
              "
            />

            <div className="relative">

              <div className="text-5xl">
                🇷🇼
              </div>

              <h2
                className="
                  text-3xl
                  md:text-4xl
                  font-bold
                  mt-4
                "
              >
                Ready to start learning?
              </h2>

              <p
                className="
                  mt-4
                  max-w-2xl
                  mx-auto
                  text-white/80
                "
              >
                Explore books, practice national
                examinations and discover educational
                content from Rwanda and beyond.
              </p>


              <div
                className="
                  mt-7
                  flex
                  flex-wrap
                  justify-center
                  gap-3
                "
              >

                <Link
                  to="/books"
                  className="
                    rounded-xl
                    bg-white
                    px-6
                    py-3
                    font-bold
                    transition
                    hover:-translate-y-1
                  "
                  style={{
                    color:
                      "var(--primary-color)",
                  }}
                >
                  Explore Books
                </Link>


                <Link
                  to="/youtube"
                  className="
                    rounded-xl
                    border
                    border-white/40
                    bg-white/10
                    px-6
                    py-3
                    font-bold
                    transition
                    hover:bg-white
                    hover:text-black
                  "
                >
                  Discover YouTube
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}
