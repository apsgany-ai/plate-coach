"use client";

import { useState } from "react";

const nutrientMap: Record<string, string> = {
  Calories: "Calories",
  Carbs: "Carbohydrates",
  Carbohydrates: "Carbohydrates",
  Protein: "Protein",
  Fat: "Fat",
  Fiber: "Fiber",
};

const nutrientColors: Record<string, string> = {
  Calories: "bg-orange-100 text-orange-800",
  Carbohydrates: "bg-yellow-100 text-yellow-800",
  Protein: "bg-blue-100 text-blue-800",
  Fat: "bg-red-100 text-red-800",
  Fiber: "bg-green-100 text-green-800",
};

const headingEmojis: Record<string, string> = {
  "Glucose Impact": "🩸",
  "Glycemic Index and Glycemic Load": "🍞",
  "Adjusted Portion Plate": "⚖️",
  "Quick Summary": "✅",
};

const headingColors: Record<string, string> = {
  "Glucose Impact": "text-red-500",
  "Glycemic Index and Glycemic Load": "text-yellow-600",
  "Adjusted Portion Plate": "text-blue-600",
  "Quick Summary": "text-purple-600",
};

export default function MealInputPage() {
  const [meal, setMeal] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const extractNutrientsAndLines = (text: string) => {
    const nutrients: Record<string, string> = {};
    const filteredLines: string[] = [];

    text.split("\n").forEach((line) => {
      const [keyRaw, valueRaw] = line.split(":").map((s) => s.trim());
      if (keyRaw && valueRaw && nutrientMap[keyRaw]) {
        nutrients[nutrientMap[keyRaw]] = valueRaw;
      } else if (!/Nutritional Overview/i.test(line) && line.trim() !== "") {
        filteredLines.push(line);
      }
    });

    return { nutrients, filteredLines };
  };

  const { nutrients, filteredLines } = extractNutrientsAndLines(analysis);

  const formatAnalysis = (lines: string[]) => {
    return lines.map((line, idx) => {
      const trimmed = line.trim();

      if (headingEmojis[trimmed]) {
        return (
          <div key={idx} className={`my-2 text-lg ${headingColors[trimmed]} font-semibold`}>
            {headingEmojis[trimmed]} {trimmed}
          </div>
        );
      }

      return (
        <div key={idx} className="ml-4 my-0.5 text-gray-700">
          - {trimmed}
        </div>
      );
    });
  };

  const handleAnalyze = async () => {
    if (!meal.trim()) return;

    setLoading(true);
    setAnalysis("");

    try {
      const res = await fetch("/meal-input/api/analyze-meal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meal }),
      });
      const data = await res.json();
      setAnalysis(data.result || "No result received.");
    } catch (err) {
      console.error(err);
      setAnalysis("Error analyzing meal. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4">
      {/* Header */}
      <header className="flex flex-col items-center bg-white shadow-sm rounded-xl p-5 mb-6">
        <div className="flex items-center space-x-3">
          <span className="text-4xl">🍽</span>
           <h1 className="text-2xl font-bold text-gray-800 tracking-tight">PlateCoach</h1> 
        </div>
        <p className="text-gray-500 text-center mt-1">
          Diabetes-friendly meal tracker & coach
        </p>

        {/* Navigation */}
        
      </header>

      {/* Input Section */}
      <div className="bg-white shadow-md rounded-xl p-5 mb-6">
        <textarea
          rows={4}
          placeholder="Example: 2 rotis, dal, 1 cup yogurt"
          className="w-full p-3 border border-gray-200 rounded-lg text-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          value={meal}
          onChange={(e) => setMeal(e.target.value)}
        />

        <button
          onClick={handleAnalyze}
          disabled={loading || !meal.trim()}
          className="w-full mt-4 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? "Analyzing..." : "Analyze Meal"}
        </button>
      </div>

      {/* Analysis Section */}
      {analysis && (
        <div className="bg-white shadow-md rounded-xl p-5">
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(nutrients).map(([key, value]) => (
              <span
                key={key}
                className={`px-3 py-1 rounded-full font-semibold text-sm ${nutrientColors[key]}`}
              >
                {key}: {value}
              </span>
            ))}
          </div>

          <div className="text-gray-800 leading-relaxed">
            {formatAnalysis(filteredLines)}
          </div>
        </div>
      )}
    </div>
  );
}
