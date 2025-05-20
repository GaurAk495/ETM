// pages/Login.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/solid";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", form);
    // Login logic here
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputWithIcon
            icon={<UserIcon className="h-5 w-5 text-gray-400" />}
            placeholder="Username"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
          />

          <InputWithIcon
            icon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
            placeholder="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="accent-blue-600"
              />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}

function InputWithIcon({ icon, ...props }) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
      />
    </div>
  );
}
