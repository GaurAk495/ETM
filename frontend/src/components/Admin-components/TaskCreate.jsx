import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  TagIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

export default function TaskCreationModal({
  isOpen,
  onClose,
  onCreateTask,
  teamMembers,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    priority: "Medium",
    status: "New",
    estimatedHours: "",
    tags: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const created_at = new Date().toISOString();
    const created_by = "GaurAk495";

    const newTask = {
      ...formData,
      created_at,
      created_by,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      estimatedHours: Number(formData.estimatedHours),
    };

    onCreateTask(newTask);
    setFormData({
      title: "",
      description: "",
      assignedTo: "",
      dueDate: "",
      priority: "Medium",
      status: "New",
      estimatedHours: "",
      tags: "",
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

  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
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
                <div className="bg-blue-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-100 p-2">
                        <ClipboardDocumentListIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold text-gray-900"
                      >
                        Create New Task
                      </Dialog.Title>
                    </div>
                    <button
                      onClick={onClose}
                      className="rounded-full p-1 hover:bg-blue-100 transition-colors"
                    >
                      <XMarkIcon className="h-6 w-6 text-gray-500" />
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                  <div className="space-y-6">
                    {/* Title Section */}
                    <div className="space-y-1">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Task Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        placeholder="Enter task title"
                        className="block w-full rounded-lg px-2 py-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={formData.title}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Description Section */}
                    <div className="space-y-1">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        rows={3}
                        placeholder="Describe the task..."
                        className="block w-full rounded-lg px-2 py-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Assignment and Due Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1 ">
                        <label
                          htmlFor="assignedTo"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Assign To
                        </label>
                        <div className="relative">
                          <UserIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <select
                            name="assignedTo"
                            id="assignedTo"
                            required
                            className="block w-full pl-10 rounded-lg px-2 py-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={formData.assignedTo}
                            onChange={handleChange}
                          >
                            <option value="">Select team member</option>
                            {teamMembers.map((member) => (
                              <option key={member.id} value={member.name}>
                                {member.name} - {member.role}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="dueDate"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Due Date
                        </label>
                        <div className="relative">
                          <CalendarIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="datetime-local"
                            name="dueDate"
                            id="dueDate"
                            required
                            min={getCurrentDateTime()}
                            className="block w-full pl-10 rounded-lg px-2 py-1 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={formData.dueDate}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/* <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Project
                      </label>
                      <select
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value)}
                      >
                        <option value="">Select a project</option>
                        {projects.map((project) => (
                          <option key={project.id} value={project.id}>
                            {project.name}
                          </option>
                        ))}
                      </select>
                    </div> */}

                    {/* Priority and Estimated Hours */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label
                          htmlFor="priority"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Priority
                        </label>
                        <div className="relative">
                          <ExclamationCircleIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <select
                            name="priority"
                            id="priority"
                            required
                            className="block w-full pl-10 rounded-lg px-2 py-3 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={formData.priority}
                            onChange={handleChange}
                          >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="estimatedHours"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Estimated Hours
                        </label>
                        <div className="relative">
                          <ClockIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="number"
                            name="estimatedHours"
                            id="estimatedHours"
                            min="0"
                            step="0.5"
                            required
                            placeholder="0.0"
                            className="block w-full pl-10 py-2 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={formData.estimatedHours}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-1">
                      <label
                        htmlFor="tags"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tags
                      </label>
                      <div className="relative">
                        <TagIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="tags"
                          id="tags"
                          placeholder="frontend, bug, feature (comma-separated)"
                          className="block w-full pl-10 rounded-lg border-gray-300 px-2 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={formData.tags}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-8 flex justify-end gap-3">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 font-medium"
                    >
                      Create Task
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
