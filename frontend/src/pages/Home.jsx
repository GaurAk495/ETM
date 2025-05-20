// pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to TaskFlow
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          A smart task management solution for employers and employees to stay
          organized, track progress, and improve productivity.
        </p>

        <div className="space-x-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            Get Started
          </Link>
        </div>
      </div>

      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        <FeatureCard
          title="Assign Tasks"
          description="Employers can create and assign tasks with deadlines and priorities."
        />
        <FeatureCard
          title="Track Progress"
          description="Monitor the status of all tasks in real-time with visual indicators."
        />
        <FeatureCard
          title="Employee Reports"
          description="Employees can view their tasks and submit status reports with ease."
        />
      </section>
    </main>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
