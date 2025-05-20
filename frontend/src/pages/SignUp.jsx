// pages/Signup.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserCircleIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/solid";

export default function Signup() {
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "employee",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Signup Data:", form);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputWithIcon
            icon={<UserCircleIcon className="h-5 w-5 text-gray-400" />}
            placeholder="Full Name"
            type="text"
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
          />

          <InputWithIcon
            icon={<UserIcon className="h-5 w-5 text-gray-400" />}
            placeholder="Username"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
          />

          <InputWithIcon
            icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
            placeholder="Email"
            type="email"
            name="email"
            value={form.email}
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

          <InputWithIcon
            icon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <div className="relative">
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
            >
              <option value="employer">👔 Employer</option>
              <option value="employee">🧑‍💻 Employee</option>
            </select>
            <BriefcaseIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
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
