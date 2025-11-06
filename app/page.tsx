"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [name, setName] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("platecoach_user");
    if (saved) setName(JSON.parse(saved).name);
  }, []);

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        🏠 Welcome {name ? `${name}!` : "to PlateCoach!"}
      </h1>
      <p className="text-gray-600 mb-6">
        Track your meals, understand your nutrition, and make diabetes-friendly choices effortlessly.
      </p>

      <div className="flex justify-center gap-4">
        <a
          href="/meal-input"
          className="bg-green-500 text-white px-5 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
        >
          🍽️ Log a Meal
        </a>
        {!name && (
          <a
            href="/signup"
            className="bg-gray-100 text-gray-700 px-5 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            🩺 Sign Up
          </a>
        )}
      </div>
    </div>
  );
}
