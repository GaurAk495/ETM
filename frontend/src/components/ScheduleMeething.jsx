import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  VideoCameraIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export default function ScheduleMeetingModal({ isOpen, onClose, teamMembers }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    duration: "30",
    participants: [],
    meetingType: "online",
    location: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const meeting = {
      ...formData,
      created_at: new Date().toISOString(),
      created_by: "GaurAk495",
      participants: formData.participants,
      // Combine date and time
      scheduledTime: `${formData.date}T${formData.startTime}:00`,
    };

    console.log("New meeting scheduled:", meeting);
    // Here you would typically make an API call to save the meeting

    setFormData({
      title: "",
      description: "",
      date: "",
      startTime: "",
      duration: "30",
      participants: [],
      meetingType: "online",
      location: "",
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

  const handleParticipantChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setFormData((prev) => ({
      ...prev,
      participants: selectedOptions,
    }));
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
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
                        <CalendarIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold text-gray-900"
                      >
                        Schedule New Meeting
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
                        Meeting Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        placeholder="Enter meeting title"
                        className="block w-full rounded-lg px-2 min-h-10 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                        placeholder="What's this meeting about?"
                        className="block w-full rounded-lg px-2 py-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Time and Duration Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label
                          htmlFor="date"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Date
                        </label>
                        <div className="relative">
                          <CalendarIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="date"
                            name="date"
                            id="date"
                            required
                            min={getMinDate()}
                            className="block w-full pl-10 rounded-lg border-gray-300 py-1 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={formData.date}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="startTime"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Time
                        </label>
                        <div className="relative">
                          <ClockIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="time"
                            name="startTime"
                            id="startTime"
                            required
                            className="block w-full pl-10 rounded-lg py-1 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={formData.startTime}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="duration"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Duration
                        </label>
                        <select
                          name="duration"
                          id="duration"
                          required
                          className="block w-full rounded-lg py-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={formData.duration}
                          onChange={handleChange}
                        >
                          <option value="15">15 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="45">45 minutes</option>
                          <option value="60">1 hour</option>
                          <option value="90">1.5 hours</option>
                          <option value="120">2 hours</option>
                        </select>
                      </div>
                    </div>

                    {/* Meeting Type and Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label
                          htmlFor="meetingType"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Meeting Type
                        </label>
                        <div className="relative">
                          <VideoCameraIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <select
                            name="meetingType"
                            id="meetingType"
                            required
                            className="block w-full pl-10 rounded-lg py-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={formData.meetingType}
                            onChange={handleChange}
                          >
                            <option value="online">Online Meeting</option>
                            <option value="in-person">In Person</option>
                            <option value="hybrid">Hybrid</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="location"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {formData.meetingType === "online"
                            ? "Meeting Link"
                            : "Location"}
                        </label>
                        <div className="relative">
                          <MapPinIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="location"
                            id="location"
                            placeholder={
                              formData.meetingType === "online"
                                ? "https://meet.google.com/..."
                                : "Conference Room A"
                            }
                            className="block w-full pl-10 rounded-lg border-gray-300 py-1 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={formData.location}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Participants Section */}
                    <div className="space-y-1">
                      <label
                        htmlFor="participants"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Participants
                      </label>
                      <div className="relative">
                        <UserGroupIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                        <select
                          multiple
                          name="participants"
                          id="participants"
                          required
                          className="block w-full pl-10 rounded-lg border-gray-300 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[120px]"
                          value={formData.participants}
                          onChange={handleParticipantChange}
                        >
                          {teamMembers.map((member) => (
                            <option key={member.id} value={member.name}>
                              {member.name} - {member.role}
                            </option>
                          ))}
                        </select>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Hold Ctrl/Cmd to select multiple participants
                      </p>
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
                      Schedule Meeting
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
