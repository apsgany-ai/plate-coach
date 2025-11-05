export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to Plate Coach</h1>

      <a
        href="/meal-input"
        className="bg-green-600 text-white p-4 rounded-lg text-xl font-bold"
      >
        Log Meal
      </a>
    </div>
  );
}
