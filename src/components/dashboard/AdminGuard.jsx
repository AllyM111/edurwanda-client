
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminGuard({ children }) {
  const { user, loading } = useAuth();

  // ==========================================
  // CHECKING AUTHENTICATION
  // ==========================================

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-gray-900
          text-white
        "
      >
        <div className="text-center">
          <div
            className="
              w-10
              h-10
              border-4
              border-gray-600
              border-t-white
              rounded-full
              animate-spin
              mx-auto
              mb-4
            "
          />

          <p className="text-gray-300">
            Checking access...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // ==========================================
  // CHECK USER ROLE
  // ==========================================

  const role = user.role?.toUpperCase();

  // ==========================================
  // NOT ADMIN
  // ==========================================

  if (role !== "ADMIN") {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // ==========================================
  // ADMIN ALLOWED
  // ==========================================

  return children;
}
