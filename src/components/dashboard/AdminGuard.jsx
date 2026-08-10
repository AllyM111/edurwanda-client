import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminGuard({ children }) {

  const {
    user,
    loading
  } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking access...
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Accept ADMIN or admin
  const role = user.role?.toUpperCase();

  if (role !== "ADMIN") {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}