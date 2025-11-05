"use client";

import { useState } from "react";

export default function MealInputPage() {
  const [mealText, setMealText] = useState("");

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Log Your Meal</h1>

      <textarea
        placeholder="Example: 2 rotis, dal, and a cup of curd"
        value={mealText}
        onChange={(e) => setMealText(e.target.value)}
        className="border p-3 rounded w-full max-w-md h-32"
      />

      {/* This button will call AI in Day 3 */}
      <button
        disabled={!mealText}
        className="bg-green-600 text-white p-3 rounded mt-4 w-full max-w-md disabled:bg-gray-400"
      >
        Analyze Meal (Coming Soon)
      </button>
    </div>
  );
}
