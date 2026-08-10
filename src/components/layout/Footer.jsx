
import { Link } from "react-router-dom";

import { useSettings } from "../../context/SettingsContext";

export default function Footer() {
  const { settings } = useSettings();

  // ============================
  // BRAND SETTINGS
  // ============================

  const logo =
    settings?.logoUrl || "/favicon.png";

  const siteName =
    settings?.siteName || "EduRwanda";

  const siteDescription =
    settings?.siteDescription ||
    "Providing digital learning resources, national exams and books for Rwandan students.";

  return (
    <footer
      className="
        mt-20
        border-t
        transition-colors
        duration-300
      "
      style={{
        backgroundColor: "var(--card-color)",
        borderColor: "var(--border-color)",
        color: "var(--text-color)",
      }}
    >
      {/* ============================
          FOOTER CONTENT
      ============================ */}

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-12
          grid
          md:grid-cols-3
          gap-10
        "
      >
        {/* ============================
            BRAND
        ============================ */}

        <div>
          <Link
            to="/"
            className="
              inline-flex
              items-center
              gap-3
              group
            "
          >
            {/* EduRwanda Icon */}

            <img
              src={logo}
              alt="EduRwanda logo"
              className="
                w-12
                h-12
                object-contain
                flex-shrink-0
                transition-transform
                duration-200
                group-hover:scale-105
              "
              onError={(event) => {
                event.currentTarget.src =
                  "/favicon.png";
              }}
            />

            {/* Brand Name */}

            <div className="flex flex-col leading-tight">
              <span
                className="
                  text-2xl
                  font-bold
                "
                style={{
                  color: "var(--primary-color)",
                }}
              >
                {siteName}
              </span>

              <span
                className="text-xs"
                style={{
                  color: "var(--muted-color)",
                }}
              >
                Learning Platform
              </span>
            </div>
          </Link>

          {/* Description */}

          <p
            className="
              mt-4
              leading-relaxed
            "
            style={{
              color: "var(--muted-color)",
            }}
          >
            {siteDescription}
          </p>
        </div>

        {/* ============================
            QUICK LINKS
        ============================ */}

        <div>
          <h3
            className="
              font-semibold
              text-lg
              mb-4
            "
            style={{
              color: "var(--primary-color)",
            }}
          >
            Quick Links
          </h3>

          <div className="space-y-3">
            <Link
              to="/"
              className="
                block
                transition
                hover:opacity-80
              "
              style={{
                color: "var(--muted-color)",
              }}
            >
              Home
            </Link>

            <Link
              to="/books"
              className="
                block
                transition
                hover:opacity-80
              "
              style={{
                color: "var(--muted-color)",
              }}
            >
              Books
            </Link>

            <Link
              to="/exams"
              className="
                block
                transition
                hover:opacity-80
              "
              style={{
                color: "var(--muted-color)",
              }}
            >
              Past Exams
            </Link>

            <Link
              to="/about"
              className="
                block
                transition
                hover:opacity-80
              "
              style={{
                color: "var(--muted-color)",
              }}
            >
              About
            </Link>
          </div>
        </div>

        {/* ============================
            CONTACT
        ============================ */}

        <div>
          <h3
            className="
              font-semibold
              text-lg
              mb-4
            "
            style={{
              color: "var(--primary-color)",
            }}
          >
            Contact
          </h3>

          <p
            style={{
              color: "var(--muted-color)",
            }}
          >
            allymutabazi11@gmail.com
          </p>

          <p
            className="mt-2"
            style={{
              color: "var(--muted-color)",
            }}
          >
            Rwanda Education Platform
          </p>
        </div>
      </div>

      {/* ============================
          COPYRIGHT
      ============================ */}

      <div
        className="
          text-center
          py-5
          text-sm
          border-t
        "
        style={{
          borderColor: "var(--border-color)",
          color: "var(--muted-color)",
        }}
      >
        © {new Date().getFullYear()} {siteName}.
        All rights reserved.
      </div>
    </footer>
  );
}
