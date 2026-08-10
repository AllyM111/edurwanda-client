
import {
  useEffect,
  useState,
} from "react";

import {
  getAnalytics,
} from "../../services/analyticsService";

import {
  useSettings,
} from "../../context/SettingsContext";

import StatCard from "../../components/dashboard/overview/StatCard";

import RecentUsers from "../../components/dashboard/overview/RecentUsers";
import RecentBooks from "../../components/dashboard/overview/RecentBooks";
import RecentExams from "../../components/dashboard/overview/RecentExams";

import AnalyticsChart from "../../components/dashboard/overview/AnalyticsChart";

import {
  FiClock,
  FiCalendar,
} from "react-icons/fi";

export default function Dashboard() {
  // ============================
  // SETTINGS
  // ============================

  const { settings } = useSettings();

  // ============================
  // STATE
  // ============================

  const [
    analytics,
    setAnalytics,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    currentTime,
    setCurrentTime,
  ] = useState("");

  const [
    currentDate,
    setCurrentDate,
  ] = useState("");

  // ============================
  // BRANDING
  // ============================

  const logo =
    settings?.logoUrl || "/favicon.png";

  const siteName =
    settings?.siteName || "EduRwanda";

  // ============================
  // RWANDA DATE & TIME
  // ============================

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const time =
        new Intl.DateTimeFormat(
          "en-GB",
          {
            timeZone: "Africa/Kigali",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }
        ).format(now);

      const date =
        new Intl.DateTimeFormat(
          "en-GB",
          {
            timeZone: "Africa/Kigali",
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        ).format(now);

      setCurrentTime(time);
      setCurrentDate(date);
    };

    // Run immediately
    updateDateTime();

    // Update every second
    const timer = setInterval(
      updateDateTime,
      1000
    );

    return () => {
      clearInterval(timer);
    };
  }, []);

  // ============================
  // LOAD DASHBOARD
  // ============================

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getAnalytics();

      console.log(
        "ANALYTICS DATA:",
        data
      );

      setAnalytics(data);
    } catch (error) {
      console.error(
        "DASHBOARD ERROR:",
        error
      );

      setError(
        "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // LOADING
  // ============================

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          flex
          flex-col
          items-center
          justify-center
          gap-4
        "
        style={{
          backgroundColor:
            "var(--background-color)",

          color:
            "var(--text-color)",
        }}
      >
        <img
          src={logo}
          alt={`${siteName} logo`}
          className="
            w-16
            h-16
            object-contain
          "
          onError={(event) => {
            event.currentTarget.src =
              "/favicon.png";
          }}
        />

        <p className="font-medium">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  // ============================
  // ERROR
  // ============================

  if (error) {
    return (
      <div
        className="
          min-h-screen
          p-6
        "
        style={{
          backgroundColor:
            "var(--background-color)",

          color:
            "var(--text-color)",
        }}
      >
        <h2
          className="
            text-xl
            font-bold
            text-red-500
          "
        >
          {error}
        </h2>

        <button
          type="button"
          onClick={loadDashboard}
          className="
            mt-4
            px-5
            py-2
            rounded-lg
            text-white
            transition
            hover:opacity-90
          "
          style={{
            backgroundColor:
              "var(--primary-color)",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  // ============================
  // DASHBOARD
  // ============================

  return (
    <div
      className="
        p-4
        sm:p-6
        space-y-8
        min-h-screen
        transition-all
        duration-300
      "
      style={{
        backgroundColor:
          "var(--background-color)",

        color:
          "var(--text-color)",
      }}
    >
      {/* ============================
          DASHBOARD HEADER
      ============================ */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-5
        "
      >
        {/* ============================
            BRAND + TITLE
        ============================ */}

        <div
          className="
            flex
            items-center
            gap-4
            min-w-0
          "
        >
          {/* EduRwanda Logo */}

          <img
            src={logo}
            alt={`${siteName} logo`}
            className="
              w-12
              h-12
              sm:w-14
              sm:h-14
              object-contain
              flex-shrink-0
            "
            onError={(event) => {
              event.currentTarget.src =
                "/favicon.png";
            }}
          />

          {/* Dashboard Title */}

          <div className="min-w-0">
            <h1
              className="
                text-2xl
                sm:text-3xl
                font-bold
              "
              style={{
                color:
                  "var(--primary-color)",
              }}
            >
              Admin Dashboard
            </h1>

            <p
              className="mt-1"
              style={{
                color:
                  "var(--muted-color)",
              }}
            >
              {siteName} platform overview
            </p>
          </div>
        </div>

        {/* ============================
            RWANDA DATE & TIME
        ============================ */}

        <div
          className="
            flex
            flex-col
            gap-2
            px-4
            py-3
            rounded-xl
            border
            w-full
            sm:w-auto
            sm:min-w-[230px]
          "
          style={{
            borderColor:
              "var(--border-color)",

            backgroundColor:
              "var(--card-color)",
          }}
        >
          {/* Date */}

          <div
            className="
              flex
              items-center
              gap-2
              text-sm
            "
            style={{
              color:
                "var(--muted-color)",
            }}
          >
            <FiCalendar
              style={{
                color:
                  "var(--primary-color)",
              }}
            />

            <span>
              {currentDate}
            </span>
          </div>

          {/* Time */}

          <div
            className="
              flex
              items-center
              gap-2
              text-lg
              font-bold
            "
            style={{
              color:
                "var(--text-color)",
            }}
          >
            <FiClock
              style={{
                color:
                  "var(--primary-color)",
              }}
            />

            <span>
              {currentTime}
            </span>

            <span
              className="
                text-xs
                font-medium
              "
              style={{
                color:
                  "var(--muted-color)",
              }}
            >
              CAT
            </span>
          </div>
        </div>
      </div>

      {/* ============================
          STATISTICS
      ============================ */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6
        "
      >
        <StatCard
          title="Users"
          value={
            analytics?.totals?.users || 0
          }
        />

        <StatCard
          title="Books"
          value={
            analytics?.totals?.books || 0
          }
        />

        <StatCard
          title="Exams"
          value={
            analytics?.totals?.exams || 0
          }
        />

        <StatCard
          title="Active Users"
          value={
            analytics?.totals?.activeUsers || 0
          }
        />
      </div>

      {/* ============================
          ANALYTICS CHART
      ============================ */}

      <AnalyticsChart
        data={
          analytics?.chartData || []
        }
      />

      {/* ============================
          RECENT DATA
      ============================ */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
        "
      >
        <RecentUsers
          users={
            analytics?.recentUsers || []
          }
        />

        <RecentBooks
          books={
            analytics?.recentBooks || []
          }
        />

        <RecentExams
          exams={
            analytics?.recentExams || []
          }
        />
      </div>
    </div>
  );
}
