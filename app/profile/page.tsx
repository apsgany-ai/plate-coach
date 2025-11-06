"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("platecoach_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("platecoach_user", JSON.stringify(user));
    setIsEditing(false);
    alert("✅ Profile updated successfully!");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete your profile and log out?")) {
      localStorage.removeItem("platecoach_user");
      router.push("/signup");
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-600">
        <p>
          No profile found. Please{" "}
          <a href="/signup" className="text-green-600 underline">
            sign up
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">👤 Your Profile</h1>

      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleEditChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleEditChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400"
          />
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleEditChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400"
          />
          <select
            name="diabetesType"
            value={user.diabetesType}
            onChange={handleEditChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400"
          >
            <option value="Type 1">Type 1 Diabetes</option>
            <option value="Type 2">Type 2 Diabetes</option>
            <option value="Prediabetic">Prediabetic</option>
          </select>

          <div className="flex justify-between mt-4">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              💾 Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Age:</strong> {user.age}
          </p>
          <p>
            <strong>Diabetes Type:</strong> {user.diabetesType}
          </p>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              ✏️ Edit Profile
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              ❌ Delete Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
