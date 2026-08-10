
import { Outlet } from "react-router-dom";

import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

export default function DashboardLayout() {
  return (
    <div
      className="min-h-screen flex"
      style={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
      }}
    >
      {/* SIDEBAR */}

      <DashboardSidebar />

      {/* RIGHT AREA */}

      <div className="flex-1 flex flex-col min-h-screen">
        {/* HEADER */}

        <DashboardHeader />

        {/* PAGE CONTENT */}

        <main
          className="flex-1 p-6 overflow-y-auto"
          style={{
            backgroundColor: "var(--background-color)",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
