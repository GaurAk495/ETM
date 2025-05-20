import { useState } from "react";
import CurrentTime from "../CurrentTime";
import {
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  DocumentIcon,
  ClockIcon,
  ChevronDownIcon,
  BellIcon,
  HomeModernIcon,
} from "@heroicons/react/24/solid";

function EmployeeHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentPage, setCurrentPage] = useState("Over View");
  const navigation = [
    {
      name: "Over View",
      href: "/employee/",
      icon: HomeModernIcon,
    },
    {
      name: "My Tasks",
      href: "/employee/mytask",
      icon: ClipboardDocumentListIcon,
    },
    {
      name: "Team Chat",
      href: "/employee/chat",
      icon: ChatBubbleLeftRightIcon,
    },
    { name: "Time Tracker", href: "/employee/timetracker", icon: ClockIcon },
    { name: "Documents", href: "/employee/documents", icon: DocumentIcon },
  ];
  return (
    <header className="bg-white shadow-sm border-b px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-20">
        <div className="flex items-center gap-8">
          <div className="">
            <h1 className="text-2xl font-bold text-gray-800">My Workspace</h1>
            <span className="text-[12px]">
              <CurrentTime />
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 text-sm font-medium ${
                  currentPage === item.name
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          {/* Time Tracker Status */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">Working on: Fix UI bugs</span>
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
                  <h3 className="font-semibold text-gray-900">Updates</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-gray-50 border-b">
                    <p className="text-sm font-medium text-gray-900">
                      Team meeting starting in 15 minutes
                    </p>
                    <p className="text-xs text-gray-500">Reminder</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 border-b">
                    <p className="text-sm font-medium text-gray-900">
                      Task "Fix UI bugs" is due soon
                    </p>
                    <p className="text-xs text-gray-500">Due in 2 hours</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50">
                    <p className="text-sm font-medium text-gray-900">
                      @TeamLead mentioned you in a comment
                    </p>
                    <p className="text-xs text-gray-500">5 minutes ago</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <div className="text-sm font-medium text-gray-900">GaurAk495</div>
              <div className="text-xs text-gray-500">Software Engineer</div>
            </div>
            <button className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg">
              <img
                src="https://i.pravatar.cc/40"
                alt="avatar"
                className="h-8 w-8 rounded-full border"
              />
              <ChevronDownIcon className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default EmployeeHeader;
