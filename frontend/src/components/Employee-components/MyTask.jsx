import { useState } from "react";
import {
  FunnelIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ClockIcon,
  CalendarIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  EyeIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";

export default function MyTasks() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const tasks = [
    {
      id: 1,
      title: "Fix UI bugs in dashboard",
      description:
        "Address the responsive design issues in the dashboard metrics cards",
      priority: "High",
      dueDate: "2025-05-21",
      status: "In Progress",
      project: "Dashboard Revamp",
      assignedBy: "Team Lead",
      estimatedHours: 4,
      timeSpent: 2.5,
    },
    {
      id: 2,
      title: "Update user documentation",
      description:
        "Update the user guide with new features from the latest release",
      priority: "Medium",
      dueDate: "2025-05-22",
      status: "Not Started",
      project: "Documentation",
      assignedBy: "Product Manager",
      estimatedHours: 6,
      timeSpent: 0,
    },
    {
      id: 3,
      title: "Code review for PR #123",
      description:
        "Review and provide feedback on the authentication module changes",
      priority: "High",
      dueDate: "2025-05-20",
      status: "Due Soon",
      project: "Auth Module",
      assignedBy: "Tech Lead",
      estimatedHours: 2,
      timeSpent: 0.5,
    },
    {
      id: 4,
      title: "Implement feedback form",
      description: "Create a new feedback form component with form validation",
      priority: "Medium",
      dueDate: "2025-05-25",
      status: "Not Started",
      project: "Customer Feedback",
      assignedBy: "Product Manager",
      estimatedHours: 8,
      timeSpent: 0,
    },
    {
      id: 5,
      title: "Debug payment integration",
      description:
        "Investigate and fix the payment processing errors in checkout",
      priority: "High",
      dueDate: "2025-05-20",
      status: "Completed",
      project: "E-commerce",
      assignedBy: "Tech Lead",
      estimatedHours: 5,
      timeSpent: 4.5,
    },
  ];

  const getPriorityColor = (priority) => {
    const priorityColor = {
      high: "bg-red-100 text-red-700",
      medium: "bg-yellow-100 text-yellow-700",
      low: "bg-green-100 text-green-700",
    };
    return priorityColor[priority.toLowerCase()] || "bg-gray-100 text-gray-700";
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in progress":
        return "bg-blue-100 text-blue-700";
      case "due soon":
        return "bg-yellow-100 text-yellow-700";
      case "not started":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus !== "all" && task.status !== filterStatus) return false;
    if (filterPriority !== "all" && task.priority !== filterPriority)
      return false;
    if (
      searchQuery &&
      !task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="space-y-6 p-10">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <ClockIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <ExclamationCircleIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Due Soon</h3>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Completed</h3>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Tasks</h3>
              <p className="text-2xl font-bold text-gray-900">9</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {/* Header with filters */}
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">My Tasks</h2>
            <div className="flex flex-col md:flex-row items-center gap-4">
              {/* Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filters */}
              <div className="flex items-center gap-4">
                <select
                  className="pl-4 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Due Soon">Due Soon</option>
                  <option value="Completed">Completed</option>
                </select>
                <select
                  className="pl-4 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                >
                  <option value="all">All Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {task.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {task.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">
                      {task.project}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {task.dueDate}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-col">
                      <span>
                        {task.timeSpent}h / {task.estimatedHours}h
                      </span>
                      <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{
                            width: `${
                              (task.timeSpent / task.estimatedHours) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      {task.status !== "Completed" && (
                        <button
                          className="text-green-600 hover:text-green-700"
                          title={
                            task.status === "In Progress"
                              ? "Complete Task"
                              : "Start Task"
                          }
                        >
                          {task.status === "In Progress" ? (
                            <CheckCircleIcon className="h-5 w-5" />
                          ) : (
                            <PlayIcon className="h-5 w-5" />
                          )}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {filteredTasks.length} tasks
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
