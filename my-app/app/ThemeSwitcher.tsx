"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <button
        className="w-16 h-7 flex items-center justify-between rounded-full bg-transparent shadow-inner shadow-gray-400 dark:shadow-gray-600 relative hover:cursor-pointer"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <span className="sr-only">Toggle Theme</span>
        <MoonIcon
          width={20}
          height={20}
          className="mx-1 z-10 text-gray-400 dark:text-white hover:scale-110"
        />
        <SunIcon
          width={20}
          height={20}
          className="mx-1 z-10 text-black dark:text-gray-500 hover:scale-110"
        />

        <div
          className={`absolute left-0 top-0 w-7 h-full rounded-full transition-all duration-300 ${
            theme === "light"
              ? "translate-x-0 bg-gradient-to-t from-amber-600 to-orange-300"
              : "translate-x-9 bg-gradient-to-t from-gray-950 to-gray-500"
          }`}
        />
      </button>
    </>
  );
};
