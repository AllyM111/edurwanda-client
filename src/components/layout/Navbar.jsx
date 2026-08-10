
import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  useSettings,
} from "../../context/SettingsContext";

import {
  FiMenu,
  FiX,
  FiClock,
} from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const [currentTime, setCurrentTime] =
    useState("");

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const { settings } = useSettings();

  // ============================
  // LIVE RWANDA TIME
  // ============================

  useEffect(() => {
    const updateTime = () => {
      const time = new Intl.DateTimeFormat(
        "en-GB",
        {
          timeZone: "Africa/Kigali",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }
      ).format(new Date());

      setCurrentTime(time);
    };

    // Show immediately
    updateTime();

    // Update every second
    const timer = setInterval(
      updateTime,
      1000
    );

    return () => {
      clearInterval(timer);
    };
  }, []);

  // ============================
  // NAVIGATION LINKS
  // ============================

  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Books",
      path: "/books",
    },
    {
      name: "Exams",
      path: "/exams",
    },
    {
      name: "About",
      path: "/about",
    },
  ];

  // ============================
  // LOGOUT
  // ============================

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  // ============================
  // CLOSE MOBILE MENU
  // ============================

  const closeMenu = () => {
    setOpen(false);
  };

  // ============================
  // NAV LINK STYLE
  // ============================

  const navClass = ({ isActive }) => ({
    color: isActive
      ? "var(--primary-color)"
      : "var(--text-color)",

    fontWeight: isActive ? "700" : "500",

    transition: "color 0.2s ease",
  });

  // ============================
  // LOGO
  // ============================

  const logo =
    settings?.logoUrl || "/favicon.png";

  const siteName =
    settings?.siteName || "EduRwanda";

  const siteDescription =
    settings?.siteDescription ||
    "Learning Platform";

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        shadow-sm
        transition-colors
        duration-300
      "
      style={{
        background:
          "var(--header-color)",

        color:
          "var(--text-color)",
      }}
    >
      {/* ============================
          NAVBAR CONTAINER
      ============================ */}

      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          py-3
          flex
          items-center
          justify-between
        "
      >
        {/* ============================
            EDU RWANDA BRAND
        ============================ */}

        <NavLink
          to="/"
          onClick={closeMenu}
          className="
            flex
            items-center
            gap-3
            min-w-0
            flex-shrink-0
          "
        >
          {/* EduRwanda Icon */}

          <img
            src={logo}
            alt="EduRwanda logo"
            className="
              w-10
              h-10
              sm:w-11
              sm:h-11
              object-contain
              flex-shrink-0
            "
            onError={(event) => {
              event.currentTarget.src =
                "/favicon.png";
            }}
          />

          {/* Brand Text */}

          <div
            className="
              flex
              flex-col
              leading-tight
            "
          >
            <span
              className="
                text-lg
                sm:text-xl
                font-bold
                truncate
              "
              style={{
                color:
                  "var(--primary-color)",
              }}
            >
              {siteName}
            </span>

            <span
              className="
                hidden
                sm:block
                text-xs
                truncate
              "
              style={{
                color:
                  "var(--muted-color)",
              }}
            >
              {siteDescription}
            </span>
          </div>
        </NavLink>

        {/* ============================
            DESKTOP NAVIGATION
        ============================ */}

        <nav
          className="
            hidden
            md:flex
            items-center
            gap-7
            lg:gap-8
          "
        >
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              style={navClass}
            >
              {link.name}
            </NavLink>
          ))}

          {user && (
            <NavLink
              to="/dashboard"
              style={navClass}
            >
              Dashboard
            </NavLink>
          )}
        </nav>

        {/* ============================
            DESKTOP RIGHT SIDE
        ============================ */}

        <div
          className="
            hidden
            md:flex
            items-center
            gap-3
          "
        >
          {/* ============================
              RWANDA CLOCK
          ============================ */}

          <div
            className="
              flex
              items-center
              gap-2
              px-3
              py-2
              rounded-lg
              border
              text-sm
              font-medium
            "
            style={{
              borderColor:
                "var(--border-color)",

              color:
                "var(--muted-color)",
            }}
            title="Rwanda time"
          >
            <FiClock
              className="text-base"
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
                hidden
                lg:inline
                text-xs
              "
              style={{
                color:
                  "var(--muted-color)",
              }}
            >
              CAT
            </span>
          </div>

          {/* ============================
              AUTHENTICATION
          ============================ */}

          {!user ? (
            <>
              <NavLink
                to="/login"
                className="
                  px-4
                  py-2
                  rounded-lg
                  border
                  transition
                  hover:opacity-80
                "
                style={{
                  borderColor:
                    "var(--primary-color)",

                  color:
                    "var(--primary-color)",
                }}
              >
                Login
              </NavLink>

              {settings?.allowRegistration && (
                <NavLink
                  to="/register"
                  className="
                    px-4
                    py-2
                    rounded-lg
                    text-white
                    transition
                    hover:opacity-90
                  "
                  style={{
                    background:
                      "var(--primary-color)",
                  }}
                >
                  Register
                </NavLink>
              )}
            </>
          ) : (
            <>
              <span
                className="
                  max-w-[150px]
                  truncate
                  font-medium
                "
                style={{
                  color:
                    "var(--text-color)",
                }}
                title={user.name}
              >
                {user.name}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="
                  px-4
                  py-2
                  rounded-lg
                  text-white
                  transition
                  hover:opacity-90
                "
                style={{
                  background: "#dc2626",
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* ============================
            MOBILE MENU BUTTON
        ============================ */}

        <button
          type="button"
          onClick={() =>
            setOpen((value) => !value)
          }
          className="
            md:hidden
            p-2
            rounded-lg
            text-2xl
            transition
          "
          aria-label={
            open
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={open}
          style={{
            color:
              "var(--text-color)",
          }}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* ============================
          MOBILE MENU
      ============================ */}

      {open && (
        <div
          className="
            md:hidden
            border-t
            px-4
            sm:px-6
            pb-6
            pt-4
          "
          style={{
            background:
              "var(--header-color)",
          }}
        >
          {/* Mobile Rwanda Time */}

          <div
            className="
              flex
              items-center
              gap-2
              mb-5
              text-sm
              font-medium
            "
            style={{
              color:
                "var(--muted-color)",
            }}
          >
            <FiClock
              style={{
                color:
                  "var(--primary-color)",
              }}
            />

            <span>
              Rwanda Time: {currentTime}
            </span>
          </div>

          {/* Mobile Navigation */}

          <nav
            className="
              flex
              flex-col
              gap-4
            "
          >
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                style={navClass}
                className="block"
              >
                {link.name}
              </NavLink>
            ))}

            {user && (
              <NavLink
                to="/dashboard"
                onClick={closeMenu}
                style={navClass}
                className="block"
              >
                Dashboard
              </NavLink>
            )}
          </nav>

          {/* Mobile Authentication */}

          <div className="mt-5">
            {!user ? (
              <div
                className="
                  flex
                  flex-col
                  gap-3
                "
              >
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  className="
                    px-4
                    py-2
                    rounded-lg
                    border
                    text-center
                  "
                  style={{
                    borderColor:
                      "var(--primary-color)",

                    color:
                      "var(--primary-color)",
                  }}
                >
                  Login
                </NavLink>

                {settings?.allowRegistration && (
                  <NavLink
                    to="/register"
                    onClick={closeMenu}
                    className="
                      px-4
                      py-2
                      rounded-lg
                      text-white
                      text-center
                    "
                    style={{
                      background:
                        "var(--primary-color)",
                    }}
                  >
                    Register
                  </NavLink>
                )}
              </div>
            ) : (
              <div
                className="
                  flex
                  flex-col
                  gap-3
                "
              >
                <span
                  className="font-medium"
                  style={{
                    color:
                      "var(--text-color)",
                  }}
                >
                  {user.name}
                </span>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    px-4
                    py-2
                    rounded-lg
                    text-white
                    text-center
                    transition
                    hover:opacity-90
                  "
                  style={{
                    background:
                      "#dc2626",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
