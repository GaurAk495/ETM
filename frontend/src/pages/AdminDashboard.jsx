import MetricCard from "../components/MetricCard";
import { useEffect, useState } from "react";
import TaskCreationModal from "../components/TaskCreate";
import { taskService } from "../services/taskService";
import WorldClock from "../components/WorldClock";
import ScheduleMeetingModal from "../components/ScheduleMeething";
import AddNewMember from "../components/AddNewMember";
import ReportsModal from "../components/Reports.jsx";
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
import CurrentTime from "../components/CurrentTime.jsx";

const COLORS = ["#3B82F6", "#FBBF24", "#10B981", "#EF4444"];
const PRODUCTIVITY_COLORS = ["#10B981", "#3B82F6"];

const taskStatusData = [
  { name: "New", value: 12 },
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

export default function EmployerDashboard() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);

  const handleCreateTask = async (newTask) => {
    try {
      setIsLoading(true);

      // Call API to create task
      const createdTask = await taskService.createTask(newTask);

      // Update local state based on task priority
      if (createdTask.priority === "High") {
        setUrgentTasks((prevTasks) => [
          ...prevTasks,
          {
            id: createdTask.id,
            title: createdTask.title,
            assignedTo: createdTask.assignedTo,
            priority: createdTask.priority,
            dueDate: new Date(createdTask.dueDate).toISOString().split("T")[0],
            status: "Active",
          },
        ]);
      }

      // Show success message (you'll need to implement this)
      alert("Task created successfully!");
    } catch (error) {
      console.error("Failed to create task:", error);
      alert("Failed to create task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTeamMember = (newMember) => {
    console.log("New team member:", newMember);
    // Here you would typically make an API call to save the team member
    // and update your local state
  };

  // const currentDate = new Date().toLocaleString("en-In", {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   second: "2-digit",
  //   timeZoneName: "short",
  // });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Topbar */}
      <header className="bg-white shadow-sm px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Management Dashboard
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-gray-500">Live</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">
                  <CurrentTime />
                </span>
              </div>
              <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                <UsersIcon className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-600">
                  GaurAk495
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">GaurAk495</p>
                <p className="text-xs text-gray-500">Team Manager</p>
              </div>
              <img
                src="https://i.pravatar.cc/40?img=4"
                alt="Profile"
                className="h-10 w-10 rounded-full border-2 border-blue-500"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
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
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Quick Actions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={() => setIsAddMemberModalOpen(true)}
              className="flex items-center justify-center gap-2 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <UserPlusIcon className="h-5 w-5 text-green-500" />
              <span className="text-green-700">Add Team Member</span>
            </button>
            <button
              onClick={() => setIsTaskModalOpen(true)}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <ClipboardDocumentListIcon className="h-5 w-5 text-green-500" />
              <span className="text-green-700">
                {isLoading ? "Creating..." : "Create Task"}
              </span>
            </button>
            <button
              onClick={() => setIsReportsModalOpen(true)}
              className="flex items-center justify-center gap-2 p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <ChartBarIcon className="h-5 w-5 text-indigo-500" />
              <span className="text-indigo-700">View All Reports</span>
            </button>
            <button
              onClick={() => setIsMeetingModalOpen(true)}
              className="flex items-center justify-center gap-2 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <ClockIcon className="h-5 w-5 text-purple-500" />
              <span className="text-purple-700">Schedule Meeting</span>
            </button>
          </div>
        </div>
      </main>
      <AddNewMember
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onAddMember={handleAddTeamMember}
      />
      <ScheduleMeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        teamMembers={teamMembers}
      />
      <TaskCreationModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onCreateTask={handleCreateTask}
        teamMembers={teamMembers}
      />
      <ReportsModal
        isOpen={isReportsModalOpen}
        onClose={() => setIsReportsModalOpen(false)}
        currentUser="GaurAk495"
        currentDateTime="2025-05-20 15:29:07"
      />
    </div>
  );
}
