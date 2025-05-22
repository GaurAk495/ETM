import { useState } from "react";
import {
  BellIcon,
  ChevronDownIcon,
  UsersIcon,
  UserPlusIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  FolderIcon,
  HomeModernIcon,
} from "@heroicons/react/24/solid";
import CurrentTime from "../CurrentTime";
import TaskCreationModal from "./TaskCreate";
import { taskService } from "../../services/taskService";
import ScheduleMeetingModal from "./ScheduleMeething";
import AddNewMember from "./AddNewMember";
import ReportsModal from "./Reports.jsx";
import { useLocation, useNavigate } from "react-router-dom";

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

export default function AdminHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const openModal = (Modal) => {
    if (Modal === "Add Task") {
      setIsTaskModalOpen(true);
    } else if (Modal === "Meeting") {
      setIsMeetingModalOpen(true);
    } else if (Modal === "Add Member") {
      setIsAddMemberModalOpen(true);
    } else if (Modal === "Report") {
      setIsReportsModalOpen(true);
    } else if (Modal === "Project") {
      navigate("/admin/project");
    } else if (Modal === "Home") {
      navigate("/admin");
    }
  };

  const navigation = [
    { name: "Home", icon: HomeModernIcon, Modal: "Home", href: "/admin" },
    { name: "Overview", icon: ChartBarIcon, Modal: "Report" },
    { name: "Add Member", icon: UserPlusIcon, Modal: "Add Member" },
    { name: "Create Task", icon: ClipboardDocumentListIcon, Modal: "Add Task" },
    { name: "Reports", icon: DocumentTextIcon, Modal: "Report" },
    {
      name: "Projects",
      icon: FolderIcon,
      Modal: "Project",
      href: "/admin/project",
    },
  ];

  return (
    <>
      <header className="bg-white shadow-sm border-b px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-20">
          <div className="flex items-center gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-gray-800">
                Management Dashboard
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[12px] text-gray-500">Live</span>
                </div>
                <span className="text-[12px] text-gray-600">
                  <CurrentTime />
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  onClick={() => openModal(item.Modal)}
                  className={`flex items-center gap-2 text-sm font-medium cursor-pointer 
                  ${location.pathname === item.href ? "text-blue-600" : ""}`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </div>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-6">
            {/* Admin Status */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg">
              <UsersIcon className="h-5 w-5" />
              <span className="text-sm font-medium">15 Team Members</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                  2
                </span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border py-2 z-50">
                  <div className="px-4 py-2 border-b">
                    <h3 className="font-semibold text-gray-900">
                      Admin Updates
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-gray-50 border-b">
                      <p className="text-sm font-medium text-gray-900">
                        New team member request pending
                      </p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-50">
                      <p className="text-sm font-medium text-gray-900">
                        Monthly report is ready for review
                      </p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
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
                <div className="text-xs text-gray-500">Team Manager</div>
              </div>
              <button className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg">
                <img
                  src="https://i.pravatar.cc/40?img=4"
                  alt="avatar"
                  className="h-8 w-8 rounded-full border-2 border-blue-500"
                />
                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </header>
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
    </>
  );
}
