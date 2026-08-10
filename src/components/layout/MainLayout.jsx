import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
      }}
    >
      <Navbar />

      <main
        style={{
          backgroundColor: "var(--background-color)",
          color: "var(--text-color)",
        }}
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}