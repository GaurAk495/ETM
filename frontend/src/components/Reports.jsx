import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  ChartBarIcon,
  ChartPieIcon,
  ClockIcon,
  UserGroupIcon,
  DocumentChartBarIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

export default function ViewReportsModal({ isOpen, onClose }) {
  const [selectedReport, setSelectedReport] = useState("performance");

  const reports = {
    performance: {
      title: "Team Performance",
      data: [
        {
          name: "Tasks Completed",
          value: 45,
          change: "+12%",
          status: "increase",
        },
        {
          name: "On-time Delivery",
          value: "92%",
          change: "+5%",
          status: "increase",
        },
        {
          name: "Average Task Duration",
          value: "3.2 days",
          change: "-8%",
          status: "decrease",
        },
        { name: "Active Projects", value: 12, change: "0%", status: "neutral" },
      ],
    },
    attendance: {
      title: "Attendance Overview",
      data: [
        {
          name: "Present Today",
          value: "95%",
          change: "+2%",
          status: "increase",
        },
        { name: "On Leave", value: "3", change: "-1", status: "decrease" },
        { name: "Late Arrivals", value: "2", change: "-3", status: "decrease" },
        {
          name: "Work from Home",
          value: "15",
          change: "+5",
          status: "increase",
        },
      ],
    },
    productivity: {
      title: "Productivity Metrics",
      data: [
        {
          name: "Team Efficiency",
          value: "87%",
          change: "+4%",
          status: "increase",
        },
        {
          name: "Tasks per Member",
          value: "8.5",
          change: "+1.2",
          status: "increase",
        },
        {
          name: "Average Response Time",
          value: "2.4h",
          change: "-18min",
          status: "decrease",
        },
        {
          name: "Goals Achieved",
          value: "92%",
          change: "+7%",
          status: "increase",
        },
      ],
    },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "increase":
        return "text-green-600 bg-green-50";
      case "decrease":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                {/* Header */}
                <div className="bg-blue-50 px-8 py-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-blue-100 p-2.5">
                        <DocumentChartBarIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold text-gray-900"
                      >
                        View Reports
                      </Dialog.Title>
                    </div>
                    <button
                      onClick={onClose}
                      className="rounded-full p-2 hover:bg-blue-100 transition-colors"
                    >
                      <XMarkIcon className="h-6 w-6 text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="p-8">
                  {/* Report Navigation */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <button
                      onClick={() => setSelectedReport("performance")}
                      className={`flex items-center gap-3 p-4 rounded-xl transition-colors ${
                        selectedReport === "performance"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <ChartBarIcon className="h-6 w-6" />
                      <span className="font-medium">Team Performance</span>
                    </button>
                    <button
                      onClick={() => setSelectedReport("attendance")}
                      className={`flex items-center gap-3 p-4 rounded-xl transition-colors ${
                        selectedReport === "attendance"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <ClockIcon className="h-6 w-6" />
                      <span className="font-medium">Attendance Overview</span>
                    </button>
                    <button
                      onClick={() => setSelectedReport("productivity")}
                      className={`flex items-center gap-3 p-4 rounded-xl transition-colors ${
                        selectedReport === "productivity"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <ArrowTrendingUpIcon className="h-6 w-6" />
                      <span className="font-medium">Productivity Metrics</span>
                    </button>
                  </div>

                  {/* Report Content */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-6">
                      {reports[selectedReport].title}
                    </h4>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {reports[selectedReport].data.map((item, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg p-4 shadow-sm"
                        >
                          <div className="text-sm text-gray-600 mb-2">
                            {item.name}
                          </div>
                          <div className="text-2xl font-bold text-gray-900 mb-2">
                            {item.value}
                          </div>
                          <div
                            className={`text-sm font-medium px-2 py-1 rounded-full inline-flex items-center gap-1 ${getStatusColor(
                              item.status
                            )}`}
                          >
                            {item.change}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Date Range and Export */}
                    <div className="mt-8 flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Data from: May 1, 2025 - May 20, 2025
                      </div>
                      <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Export Report
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
