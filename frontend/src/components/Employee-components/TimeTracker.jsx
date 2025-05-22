import { useState, useEffect } from "react";
import { PlayIcon, PauseIcon, StopIcon } from "@heroicons/react/24/solid";

export default function TimeTracker() {
  const [isTracking, setIsTracking] = useState(false);
  const [currentTask, setCurrentTask] = useState(1);
  const [timer, setTimer] = useState(0);
  const [todayTotal, setTodayTotal] = useState(0);
  const [timeEntries, setTimeEntries] = useState([
    {
      id: 1,
      taskName: "Fix UI bugs",
      duration: "2h 15m",
      startTime: "09:00",
      endTime: "11:15",
      status: "completed",
    },
    {
      id: 2,
      taskName: "Team Meeting",
      duration: "1h",
      startTime: "11:30",
      endTime: "12:30",
      status: "completed",
    },
  ]);

  return (
    <div className="space-y-6 p-10">
      {/* Active Timer */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Time Tracker
            </h2>
            <p className="text-sm text-gray-500">Track your work time</p>
          </div>
          <div className="text-3xl font-mono font-bold text-gray-800">
            {String(Math.floor(timer / 3600)).padStart(2, "0")}:
            {String(Math.floor((timer % 3600) / 60)).padStart(2, "0")}:
            {String(timer % 60).padStart(2, "0")}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <select
            className="flex-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 py-2 px-2"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
          >
            <option value="">Select a task</option>
            <option value="1">Fix UI bugs</option>
            <option value="2">Update documentation</option>
            <option value="3">Code review</option>
          </select>

          <button
            onClick={() => setIsTracking(!isTracking)}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
              isTracking
                ? "bg-red-50 text-red-700 hover:bg-red-100"
                : "bg-green-50 text-green-700 hover:bg-green-100"
            }`}
          >
            {isTracking ? (
              <>
                <PauseIcon className="h-5 w-5" />
                Pause
              </>
            ) : (
              <>
                <PlayIcon className="h-5 w-5" />
                Start
              </>
            )}
          </button>

          <button
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            title="Stop tracking"
          >
            <StopIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Today's Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Today's Total
          </h3>
          <p className="text-2xl font-bold text-gray-900">7h 15m</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Week Total</h3>
          <p className="text-2xl font-bold text-gray-900">32h 45m</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Tasks Completed
          </h3>
          <p className="text-2xl font-bold text-gray-900">4</p>
        </div>
      </div>

      {/* Time Entries */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Today's Time Entries
          </h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Task
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Start Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                End Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {timeEntries.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {entry.taskName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {entry.startTime}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {entry.endTime}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {entry.duration}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                    {entry.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
