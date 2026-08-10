import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getSettings,
} from "../services/settingsService";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {

  const [settings, setSettings] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {

    try {

      const data = await getSettings();

      console.log("SETTINGS:", data);

      setSettings(data);

      applyTheme(data);

    } catch (error) {

      console.error("SETTINGS ERROR:", error);

    } finally {

      setLoading(false);

    }

  };

  // ==========================================
  // APPLY THEME
  // ==========================================

  const applyTheme = (data) => {

    if (!data) return;

    const root = document.documentElement;

    // Primary Color

    root.style.setProperty(
      "--primary-color",
      getColor(data.primaryColor)
    );

    // ===========================
    // DARK MODE
    // ===========================

    if (data.theme === "dark") {

      root.classList.add("dark");
      root.classList.remove("light");

      root.style.setProperty("--background-color", "#030712");
      root.style.setProperty("--card-background", "#111827");
      root.style.setProperty("--sidebar-color", "#030712");
      root.style.setProperty("--header-color", "#111827");
      root.style.setProperty("--text-color", "#ffffff");
      root.style.setProperty("--muted-color", "#9ca3af");

    }

    // ===========================
    // LIGHT MODE
    // ===========================

    else {

      root.classList.add("light");
      root.classList.remove("dark");

      root.style.setProperty("--background-color", "#f8fafc");
      root.style.setProperty("--card-background", "#ffffff");
      root.style.setProperty("--sidebar-color", "#ffffff");
      root.style.setProperty("--header-color", "#ffffff");
      root.style.setProperty("--text-color", "#0f172a");
      root.style.setProperty("--muted-color", "#64748b");

    }

  };

  // ==========================================
  // UPDATE SETTINGS
  // ==========================================

  const updateSettingsState = (newSettings) => {

    setSettings(newSettings);

    applyTheme(newSettings);

  };

  return (

    <SettingsContext.Provider
      value={{
        settings,
        setSettings: updateSettingsState,
        loading,
        refreshSettings: loadSettings,
        applyTheme,
      }}
    >

      {children}

    </SettingsContext.Provider>

  );

}

// ==========================================
// PRIMARY COLORS
// ==========================================

function getColor(color) {

  switch (color) {

    case "green":
      return "#16a34a";

    case "purple":
      return "#9333ea";

    case "red":
      return "#dc2626";

    case "orange":
      return "#ea580c";

    case "yellow":
      return "#ca8a04";

    case "gray":
      return "#6b7280";

    case "blue":
    default:
      return "#2563eb";

  }

}

export function useSettings() {

  return useContext(SettingsContext);

}