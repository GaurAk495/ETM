import MetricCard from "..//MetricCard";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ClockIcon,
  CalendarIcon,
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

function OverView() {
  return (
    <main className="flex-1 mt-10 px-10 w-full">
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
    </main>
  );
}

export default OverView;
