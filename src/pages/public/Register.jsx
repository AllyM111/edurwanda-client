import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", form);

      setLoading(false);

      // after register → go to login
      navigate("/login");
    } catch (err) {
      setLoading(false);
      setError(
        err?.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg"
        
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        {error && (
          <div className="bg-red-500 text-white p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-gray-700"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-gray-700"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-gray-700"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 p-2 rounded"
           style={{
              backgroundColor: "var(--primary-color)",
              color: "#fff",
            }}
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-sm mt-4 text-center text-gray-400">
          Already have an account? Go to login
        </p>
      </form>
    </div>
  );
}

export default Register;