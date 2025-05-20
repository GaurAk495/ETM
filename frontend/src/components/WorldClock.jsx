import { useState, useEffect } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";

const timeZones = [
  { id: 1, name: "UTC", zone: "UTC" },
  { id: 7, name: "India", zone: "Asia/Kolkata" },
  { id: 2, name: "New York", zone: "America/New_York" },
  { id: 3, name: "London", zone: "Europe/London" },
  { id: 4, name: "Tokyo", zone: "Asia/Tokyo" },
  { id: 5, name: "Sydney", zone: "Australia/Sydney" },
  { id: 6, name: "Dubai", zone: "Asia/Dubai" },
];

export default function WorldClock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedZones, setSelectedZones] = useState(timeZones.slice(0, 2)); // Default to first 4 zones

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime((prevTime) => new Date(prevTime.getTime() + 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimeForZone = (date, timeZone) => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(date);
  };

  const handleZoneToggle = (zone) => {
    if (selectedZones.find((z) => z.id === zone.id)) {
      setSelectedZones(selectedZones.filter((z) => z.id !== zone.id));
    } else {
      setSelectedZones([...selectedZones, zone]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <ClockIcon className="h-6 w-6 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-800">World Clock</h2>
        </div>

        {/* Time Zone Selector */}
        <div className="flex gap-2">
          <select
            className="text-sm border rounded-md px-2 py-1"
            onChange={(e) => {
              const zone = timeZones.find(
                (z) => z.id === parseInt(e.target.value)
              );
              if (zone && !selectedZones.find((z) => z.id === zone.id)) {
                handleZoneToggle(zone);
              }
            }}
          >
            <option value="">Add timezone</option>
            {timeZones.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clock Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {selectedZones.map((zone) => (
          <div
            key={zone.id}
            className="relative bg-gray-50 rounded-lg p-4 border border-gray-200"
          >
            <button
              onClick={() => handleZoneToggle(zone)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-gray-500">
                {zone.name}
              </span>
              <div className="mt-1 text-2xl font-bold text-gray-800 font-mono">
                {formatTimeForZone(currentTime, zone.zone)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
