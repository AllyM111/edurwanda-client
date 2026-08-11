
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminGuard({ children }) {
  const { user, loading } = useAuth();

  // ==========================================
  // CHECKING AUTHENTICATION
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-gray-300">
          Checking access...
        </p>
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
