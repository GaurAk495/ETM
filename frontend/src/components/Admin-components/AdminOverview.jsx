import MetricCard from "../MetricCard";
import WorldClock from "../WorldClock";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  UsersIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChartBarIcon,
  ClockIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";

const COLORS = ["#3B82F6", "#FBBF24", "#10B981", "#EF4444"];
const PRODUCTIVITY_COLORS = ["#10B981", "#3B82F6"];

const taskStatusData = [
  { name: "Active", value: 34 },
  { name: "Completed", value: 25 },
  { name: "Overdue", value: 5 },
];

const teamProductivity = [
  { name: "Development", completed: 45, assigned: 60 },
  { name: "Design", completed: 28, assigned: 35 },
  { name: "Marketing", completed: 32, assigned: 40 },
  { name: "QA", completed: 18, assigned: 25 },
];

const teamMembers = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Senior Developer",
    tasksDue: 4,
    tasksCompleted: 12,
    productivity: 92,
    avatar: "https://i.pravatar.cc/40?img=1",
    status: "Available",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Designer",
    tasksDue: 2,
    tasksCompleted: 8,
    productivity: 85,
    avatar: "https://i.pravatar.cc/40?img=2",
    status: "In Meeting",
  },
  {
    id: 3,
    name: "Charlie Brown",
    role: "QA Engineer",
    tasksDue: 5,
    tasksCompleted: 15,
    productivity: 88,
    avatar: "https://i.pravatar.cc/40?img=3",
    status: "Away",
  },
];

const urgentTasks = [
  {
    id: 1,
    title: "Fix Critical Production Bug",
    assignedTo: "Alice Johnson",
    priority: "High",
    dueDate: "2025-05-21",
    status: "Active",
  },
  {
    id: 2,
    title: "Client Meeting Presentation",
    assignedTo: "Bob Smith",
    priority: "High",
    dueDate: "2025-05-20",
    status: "Overdue",
  },
];

function AdminOverview() {
  return (
    <main className="flex-1 p-6 space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Team Members"
          count={12}
          icon={<UsersIcon className="h-6 w-6" />}
          color="purple"
          subtitle="2 Away"
        />
        <MetricCard
          title="Active Tasks"
          count={34}
          icon={<ClipboardDocumentListIcon className="h-6 w-6" />}
          color="blue"
          subtitle="8 Due Today"
        />
        <MetricCard
          title="Completed Tasks"
          count={25}
          icon={<CheckCircleIcon className="h-6 w-6" />}
          color="green"
          subtitle="This Week"
        />
        <MetricCard
          title="Overdue Tasks"
          count={5}
          icon={<XCircleIcon className="h-6 w-6" />}
          color="red"
          subtitle="Needs Attention"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Task Distribution
            </h2>
            <select className="text-sm border rounded-md px-2 py-1">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Quarter</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {taskStatusData.map((entry, index) => (
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
        </div>

        {/* Team Productivity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Team Productivity
            </h2>
            <button className="text-blue-500 hover:text-blue-600 text-sm">
              View Details
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamProductivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="completed"
                  fill={PRODUCTIVITY_COLORS[0]}
                  name="Completed"
                />
                <Bar
                  dataKey="assigned"
                  fill={PRODUCTIVITY_COLORS[1]}
                  name="Assigned"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Team Overview and Urgent Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Members */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Team Overview
            </h2>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Manage Team
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="py-3 px-4">Member</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Tasks Due</th>
                  <th className="py-3 px-4">Completed</th>
                  <th className="py-3 px-4">Productivity</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr key={member.id} className="border-t">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={member.avatar}
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="font-medium text-gray-800">
                          {member.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-500">{member.role}</td>
                    <td className="py-3 px-4">{member.tasksDue}</td>
                    <td className="py-3 px-4">{member.tasksCompleted}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${member.productivity}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          {member.productivity}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          member.status === "Available"
                            ? "bg-green-100 text-green-700"
                            : member.status === "In Meeting"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Urgent Tasks */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Urgent Tasks
            </h2>
            <button className="text-red-500 hover:text-red-600 text-sm">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {urgentTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 bg-red-50 rounded-lg border border-red-100"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800">{task.title}</h3>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                    {task.priority}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-500">Due: {task.dueDate}</span>
                  </div>
                  <span className="text-gray-500">{task.assignedTo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <WorldClock />
    </main>
  );
}

export default AdminOverview;
