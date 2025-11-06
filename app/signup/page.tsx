"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    diabetesType: "Type 2",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage
    localStorage.setItem("platecoach_user", JSON.stringify(form));
    alert(`Welcome, ${form.name}! Your profile has been saved.`);
    router.push("/profile"); // go to profile page
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">🩺 Sign Up for PlateCoach</h1>
      <p className="text-gray-600 text-sm text-center mb-6">
        Create your account to get personalized meal insights.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400"
          required
        />

        <select
          name="diabetesType"
          value={form.diabetesType}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400"
        >
          <option value="Type 1">Type 1 Diabetes</option>
          <option value="Type 2">Type 2 Diabetes</option>
          <option value="Prediabetic">Prediabetic</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-500 text-white rounded-lg py-3 font-semibold hover:bg-green-600 transition-colors"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
