"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname(); // detect current route

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkStyle = (path: string) =>
    pathname === path
      ? "text-green-600 font-semibold border-b-2 border-green-600 pb-1"
      : "text-gray-700 hover:text-green-600 transition-colors";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200"
          : "bg-white shadow-none"
      }`}
    >
      <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo + App Name */}
        <div className="flex items-center space-x-2">
          <span className="text-3xl"></span>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            
          </h1>
        </div>

        {/* Navigation Menu */}
        <nav className="flex space-x-6 font-medium text-sm">
          <a href="/" className={linkStyle("/")}>
            🏠 Home
          </a>
          <a href="/profile" className={linkStyle("/profile")}>
            👤 Profile
          </a>
          <a href="/meal-input" className={linkStyle("/meal-input")}>
            🍽️ Log Meal
          </a>
        </nav>
      </div>
    </header>
  );
}
