import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  UserPlusIcon,
  EnvelopeIcon,
  BriefcaseIcon,
  PhoneIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

export default function AddTeamMemberModal({ isOpen, onClose, onAddMember }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    department: "",
    phone: "",
    employeeId: "",
    joiningDate: "",
  });

  const departments = [
    "Engineering",
    "Design",
    "Product",
    "Marketing",
    "Sales",
    "Human Resources",
    "Finance",
    "Operations",
  ];

  const roles = [
    "Software Engineer",
    "Product Manager",
    "Designer",
    "Marketing Specialist",
    "Sales Representative",
    "HR Manager",
    "Financial Analyst",
    "Project Manager",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMember = {
      ...formData,
      id: Date.now(),
      addedBy: "GaurAk495",
      addedAt: "2025-05-20 15:15:41",
    };

    onAddMember(newMember);
    setFormData({
      fullName: "",
      email: "",
      role: "",
      department: "",
      phone: "",
      employeeId: "",
      joiningDate: "",
    });
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getCurrentDate = () => {
    return "2025-05-20";
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                {/* Header */}
                <div className="bg-blue-50 px-8 py-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-blue-100 p-2.5">
                        <UserPlusIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold text-gray-900"
                      >
                        Add Team Member
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

                <form onSubmit={handleSubmit} className="p-8">
                  <div className="space-y-8">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Full Name
                        </label>
                        <div className="relative rounded-lg shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <UserCircleIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            required
                            placeholder="John Doe"
                            className="block w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={formData.fullName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email Address
                        </label>
                        <div className="relative rounded-lg shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            placeholder="john.doe@company.com"
                            className="block w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Role and Department */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Role
                        </label>
                        <div className="relative rounded-lg shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <select
                            name="role"
                            id="role"
                            required
                            className="block w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={formData.role}
                            onChange={handleChange}
                          >
                            <option value="">Select role</option>
                            {roles.map((role, index) => (
                              <option key={index} value={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="department"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Department
                        </label>
                        <div className="relative rounded-lg shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <select
                            name="department"
                            id="department"
                            required
                            className="block w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={formData.department}
                            onChange={handleChange}
                          >
                            <option value="">Select department</option>
                            {departments.map((dept, index) => (
                              <option key={index} value={dept}>
                                {dept}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Contact and ID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone Number
                        </label>
                        <div className="relative rounded-lg shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <PhoneIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            placeholder="+1 (555) 000-0000"
                            className="block w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="employeeId"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Employee ID
                        </label>
                        <div className="relative rounded-lg shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <UserCircleIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="employeeId"
                            id="employeeId"
                            required
                            placeholder="EMP001"
                            className="block w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={formData.employeeId}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Joining Date */}
                    <div className="space-y-2">
                      <label
                        htmlFor="joiningDate"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Joining Date
                      </label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CalendarIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          name="joiningDate"
                          id="joiningDate"
                          required
                          max={getCurrentDate()}
                          className="block w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={formData.joiningDate}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-10 flex justify-end gap-4">
                    <button
                      type="button"
                      className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 font-medium transition-colors"
                    >
                      Add Team Member
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
