import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ============================
// Scroll Handler
// ============================

import ScrollToTop from "../components/ScrollToTop";

// ============================
// Layouts
// ============================

import MainLayout from "../components/layout/MainLayout";
import DashboardLayout from "../components/dashboard/layout/DashboardLayout";
import AdminGuard from "../components/dashboard/AdminGuard";

// ============================
// Public Pages
// ============================

import Home from "../pages/public/Home";
import Books from "../pages/public/Books";
import BookDetail from "../pages/public/BookDetail";
import Exams from "../pages/public/Exams";
import ExamDetail from "../pages/public/ExamDetail";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import SearchResults from "../pages/SearchResults";
import About from "../pages/public/About";


// ============================
// YouTube Pages
// ============================

import Youtube from "../pages/public/Youtube";
import YoutubeChannel from "../pages/public/YoutubeChannel";

// ============================
// Admin Pages
// ============================

import Dashboard from "../pages/admin/Dashboard";
import AdminBooks from "../pages/admin/AdminBooks";
import AdminExams from "../pages/admin/AdminExams";
import Users from "../pages/admin/Users";
import Analytics from "../pages/admin/Analytics";
import Profile from "../pages/admin/Profile";
import Settings from "../pages/admin/Settings";
import Media from "../pages/admin/Media";
import YoutubeChannels from "../pages/admin/youtubeChannels";

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* =================================
            PUBLIC WEBSITE
        ================================= */}

        <Route element={<MainLayout />}>
          <Route index element={<Home />} />

          {/* ==========================
              BOOKS
          ========================== */}

          <Route
            path="books"
            element={<Books />}
          />

          <Route
            path="books/:id"
            element={<BookDetail />}
          />

          {/* ==========================
              EXAMS
          ========================== */}

          <Route
            path="exams"
            element={<Exams />}
          />

          <Route
            path="exams/:id"
            element={<ExamDetail />}
          />

          {/* ==========================
              SEARCH
          ========================== */}

          <Route
            path="search"
            element={<SearchResults />}
          />

          {/* ==========================
              YOUTUBE MEDIA HUB
          ========================== */}

          <Route
            path="youtube"
            element={<Youtube />}
          />

          <Route
            path="youtube/:slug"
            element={<YoutubeChannel />}
          />

          {/* ==========================
              ABOUT
          ========================== */}

          <Route
            path="about"
            element={<About />}
          />

          

          {/* ==========================
              AUTH
          ========================== */}

          <Route
            path="login"
            element={<Login />}
          />

          <Route
            path="register"
            element={<Register />}
          />
        </Route>

        {/* =================================
            ADMIN DASHBOARD
        ================================= */}

        <Route
          path="/dashboard"
          element={
            <AdminGuard>
              <DashboardLayout />
            </AdminGuard>
          }
        >
          {/* Dashboard Home */}

          <Route
            index
            element={<Dashboard />}
          />

          {/* ==========================
              BOOKS
          ========================== */}

          <Route
            path="books"
            element={<AdminBooks />}
          />

          {/* ==========================
              EXAMS
          ========================== */}

          <Route
            path="exams"
            element={<AdminExams />}
          />

          {/* ==========================
              USERS
          ========================== */}

          <Route
            path="users"
            element={<Users />}
          />

          {/* ==========================
              ANALYTICS
          ========================== */}

          <Route
            path="analytics"
            element={<Analytics />}
          />

          {/* ==========================
              PROFILE
          ========================== */}

          <Route
            path="profile"
            element={<Profile />}
          />

          {/* ==========================
              SETTINGS
          ========================== */}

          <Route
            path="settings"
            element={<Settings />}
          />

          {/* ==========================
              MEDIA
          ========================== */}

          <Route
            path="media"
            element={<Media />}
          />

          {/* ==========================
              YOUTUBE CHANNELS
          ========================== */}

          <Route
            path="youtube-channels"
            element={<YoutubeChannels />}
          />
        </Route>

        {/* =================================
            404
        ================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </>
  );
}