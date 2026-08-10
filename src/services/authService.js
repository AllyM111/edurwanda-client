
import api from "./api";

// ======================================================
// REGISTER
// ======================================================

export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);

  return res.data;
};

// ======================================================
// LOGIN
// ======================================================

export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);

  // Backend should return:
  // {
  //   token: "...",
  //   user: {...}
  // }

  if (res.data?.token) {
    localStorage.setItem("token", res.data.token);
  }

  if (res.data?.user) {
    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );
  }

  return res.data;
};

// ======================================================
// LOGOUT
// ======================================================

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ======================================================
// GET STORED TOKEN
// ======================================================

export const getToken = () => {
  return localStorage.getItem("token");
};

// ======================================================
// GET STORED USER
// ======================================================

export const getStoredUser = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};
