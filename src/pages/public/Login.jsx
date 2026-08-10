
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  // ==========================================
  // FORM STATE
  // ==========================================

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // ==========================================
  // UI STATE
  // ==========================================

  const [error, setError] = useState("");

  const [submitting, setSubmitting] = useState(false);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // HANDLE LOGIN
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError("");

    // Prevent duplicate submissions
    if (submitting) {
      return;
    }

    setSubmitting(true);

    try {
      // ========================================
      // SEND LOGIN REQUEST
      // ========================================

      const response = await login(form);

      console.log(
        "LOGIN RESPONSE:",
        response
      );

      // ========================================
      // GET USER
      // ========================================

      const loggedInUser = response?.user;

      // ========================================
      // USER WAS NOT RETURNED
      // ========================================

      if (!loggedInUser) {
        throw new Error(
          "Login succeeded but user information was not returned."
        );
      }

      // ========================================
      // NORMALIZE ROLE
      // ========================================

      const role =
        loggedInUser.role?.toUpperCase();

      // ========================================
      // ADMIN
      // ========================================

      if (role === "ADMIN") {
        navigate("/dashboard", {
          replace: true,
        });

        return;
      }

      // ========================================
      // NORMAL USER
      // ========================================

      navigate("/", {
        replace: true,
      });
    } catch (err) {
      console.error(
        "LOGIN ERROR:",
        err
      );

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Check your email and password.";

      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-900
        text-white
        px-4
      "
    >
      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-md
          p-6
          bg-gray-800
          rounded-lg
          shadow-xl
        "
      >
        {/* =====================================
            TITLE
        ====================================== */}

        <h2
          className="
            text-2xl
            font-bold
            mb-6
            text-center
          "
        >
          Login
        </h2>

        {/* =====================================
            ERROR
        ====================================== */}

        {error && (
          <div
            className="
              bg-red-500
              text-white
              p-3
              mb-4
              rounded
              text-sm
            "
          >
            {error}
          </div>
        )}

        {/* =====================================
            EMAIL
        ====================================== */}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          disabled={submitting}
          autoComplete="email"
          required
          className="
            w-full
            p-3
            mb-4
            rounded
            bg-gray-700
            text-white
            outline-none
            border
            border-transparent
            focus:border-blue-400
            disabled:opacity-50
          "
        />

        {/* =====================================
            PASSWORD
        ====================================== */}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          disabled={submitting}
          autoComplete="current-password"
          required
          className="
            w-full
            p-3
            mb-4
            rounded
            bg-gray-700
            text-white
            outline-none
            border
            border-transparent
            focus:border-blue-400
            disabled:opacity-50
          "
        />

        {/* =====================================
            LOGIN BUTTON
        ====================================== */}

        <button
          type="submit"
          disabled={submitting}
          className="
            w-full
            p-3
            rounded
            font-semibold
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
          style={{
            backgroundColor:
              "var(--primary-color)",
            color: "#fff",
          }}
        >
          {submitting
            ? "Logging in..."
            : "Login"}
        </button>

        {/* =====================================
            REGISTER LINK
        ====================================== */}

        <p
          className="
            text-sm
            mt-5
            text-center
            text-gray-400
          "
        >
          Don't have an account?{" "}

          <Link
            to="/register"
            className="
              text-blue-400
              hover:text-blue-300
              font-semibold
            "
          >
            Create Account
          </Link>
        </p>

        {/* =====================================
            HOME LINK
        ====================================== */}

        <p
          className="
            text-sm
            mt-3
            text-center
          "
        >
          <Link
            to="/"
            className="
              text-gray-400
              hover:text-white
            "
          >
            ← Back to Home
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;