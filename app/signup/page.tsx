"use client";

import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [diabetesType, setDiabetesType] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Create Your Profile</h1>

      <div className="w-full max-w-sm space-y-4">

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <select
          value={diabetesType}
          onChange={(e) => setDiabetesType(e.target.value)}
          className="w-full border p-3 rounded"
        >
          <option value="">Select Diabetes Type</option>
          <option value="Type 2">Type 2</option>
          <option value="Type 1">Type 1</option>
          <option value="Prediabetes">Prediabetes</option>
        </select>

        {/* Button navigates to Home */}
        <a
          href="/home"
          className="block bg-blue-600 text-white p-3 rounded text-center font-semibold"
        >
          Save Profile
        </a>
      </div>
    </div>
  );
}
