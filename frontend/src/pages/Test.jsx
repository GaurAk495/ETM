import { useState } from "react";
import MetricCard from "../components/MetricCard";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ClockIcon,
  CalendarIcon,
  BellIcon,
  UserCircleIcon,
  EyeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

const COLORS = ["#3B82F6", "#FBBF24", "#10B981"];

// Sample data - In a real app, this would come from an API
const chartData = [
  { name: "In Progress", value: 3 },
  { name: "Due Soon", value: 2 },
  { name: "Completed", value: 4 },
];

const myTasks = [
  {
    id: 1,
    title: "Fix UI bugs",
    priority: "High",
    dueDate: "2025-05-25",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Update user documentation",
    priority: "Medium",
    dueDate: "2025-05-22",
    status: "Completed",
  },
  {
    id: 3,
    title: "Review pull request",
    priority: "Low",
    dueDate: "2025-05-28",
    status: "Not Started",
  },
  {
    id: 4,
    title: "Team meeting preparation",
    priority: "High",
    dueDate: "2025-05-21",
    status: "Due Soon",
  },
];

const upcomingDeadlines = [
  {
    id: 1,
    title: "Submit weekly report",
    dueDate: "2025-05-21",
    timeLeft: "1 day",
  },
  {
    id: 2,
    title: "Project milestone review",
    dueDate: "2025-05-23",
    timeLeft: "3 days",
  },
];

export default function EmployeeDashboard() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Improved Topbar */}
      <header className="bg-white shadow-sm border-b px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-blue-600 font-medium">
                Overview
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Tasks
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Calendar
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Reports
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            {/* Time and Date */}
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <ClockIcon className="h-4 w-4" />
              <span>2025-05-20 16:11:47 UTC</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                  3
                </span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border py-2 z-50">
                  <div className="px-4 py-2 border-b">
                    <h3 className="font-semibold text-gray-900">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {/* Sample notifications */}
                    <div className="px-4 py-3 hover:bg-gray-50 border-b">
                      <p className="text-sm font-medium text-gray-900">
                        New task assigned
                      </p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                    {/* Add more notifications... */}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <div className="text-sm font-medium text-gray-900">
                  GaurAk495
                </div>
                <div className="text-xs text-gray-500">Software Engineer</div>
              </div>
              <img
                src="https://i.pravatar.cc/40"
                alt="avatar"
                className="h-10 w-10 rounded-full border"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="In Progress Tasks"
            count={3}
            icon={<ClipboardDocumentListIcon className="h-6 w-6" />}
            color="blue"
            trend="+2 from last week"
          />
          <MetricCard
            title="Due Soon"
            count={2}
            icon={<ClockIcon className="h-6 w-6" />}
            color="yellow"
            trend="Same as last week"
          />
          <MetricCard
            title="Completed This Week"
            count={4}
            icon={<CheckCircleIcon className="h-6 w-6" />}
            color="green"
            trend="+1 from last week"
          />
          <MetricCard
            title="Total Hours This Week"
            count={32}
            icon={<CalendarIcon className="h-6 w-6" />}
            color="purple"
            trend="On track"
          />
        </div>

        {/* Charts and Deadlines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Tasks Progress with better styling */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Tasks Progress
                </h2>
                <p className="text-sm text-gray-500">Current week overview</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChartBarIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {chartData.map((item, index) => (
                <div key={index} className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: COLORS[index] }}
                  >
                    {item.value}
                  </div>
                  <div className="text-sm text-gray-500">{item.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines with better styling */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Upcoming Deadlines
                </h2>
                <p className="text-sm text-gray-500">Tasks due soon</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Cog6ToothIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <div
                  key={deadline.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <CalendarIcon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {deadline.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Due: {deadline.dueDate}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    {deadline.timeLeft} left
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
              View All Deadlines
            </button>
          </div>
        </div>

        {/* Tasks Table with improved styling */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  My Tasks
                </h2>
                <p className="text-sm text-gray-500">
                  View and update your assigned tasks
                </p>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="w-64 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-600">
                  <th className="py-4 px-6 font-medium">Title</th>
                  <th className="py-4 px-6 font-medium">Priority</th>
                  <th className="py-4 px-6 font-medium">Due Date</th>
                  <th className="py-4 px-6 font-medium">Status</th>
                  <th className="py-4 px-6 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {myTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">{task.title}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          task.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : task.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500">{task.dueDate}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          task.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : task.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : task.status === "Due Soon"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {/* Replace Edit with View Details */}
                        <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                          <EyeIcon className="h-4 w-4" />
                          View Details
                        </button>
                        {/* Only show Complete button if task is not completed */}
                        {task.status !== "Completed" && (
                          <button className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1">
                            <CheckCircleIcon className="h-4 w-4" />
                            Mark Complete
                          </button>
                        )}
                        {/* Add Start button if task is Not Started */}
                        {task.status === "Not Started" && (
                          <button className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1">
                            <PlayIcon className="h-4 w-4" />
                            Start Task
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing 1 to {myTasks.length} of {myTasks.length} tasks
              </p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 border rounded text-sm text-gray-600 hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border rounded text-sm text-gray-600 hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
