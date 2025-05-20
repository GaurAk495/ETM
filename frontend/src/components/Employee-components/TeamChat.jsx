import { useState } from "react";
import {
  PaperAirplaneIcon,
  PaperClipIcon,
  FaceSmileIcon,
  HashtagIcon,
} from "@heroicons/react/24/solid";

export default function TeamChat() {
  const [message, setMessage] = useState("");

  const channels = [
    { id: 1, name: "general", unread: 2 },
    { id: 2, name: "dev-team", unread: 0 },
    { id: 3, name: "announcements", unread: 1 },
  ];

  const messages = [
    {
      id: 1,
      user: "Team Lead",
      avatar: "https://i.pravatar.cc/40?img=1",
      message:
        "Good morning team! Don't forget about our daily standup at 10 AM.",
      time: "09:00 AM",
    },
    {
      id: 2,
      user: "GaurAk495",
      avatar: "https://i.pravatar.cc/40?img=2",
      message: "I'll be there! Just finishing up the UI fixes.",
      time: "09:02 AM",
    },
    // Add more messages...
  ];

  return (
    <div className="h-[calc(100vh_-_12rem)] bg-white rounded-xl shadow-sm border overflow-hidden m-10">
      <div className="grid grid-cols-4 h-full">
        {/* Channels Sidebar */}
        <div className="col-span-1 border-r bg-gray-50 p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Channels</h2>
          <div className="space-y-1">
            {channels.map((channel) => (
              <button
                key={channel.id}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  <HashtagIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    {channel.name}
                  </span>
                </div>
                {channel.unread > 0 && (
                  <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
                    {channel.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="col-span-3 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <HashtagIcon className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-800">general</h2>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3">
                <img
                  src={msg.avatar}
                  alt={msg.user}
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {msg.user}
                    </span>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>
                  <p className="text-gray-700">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <PaperClipIcon className="h-5 w-5" />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 rounded-lg px-2 outline-0 text-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <FaceSmileIcon className="h-5 w-5" />
              </button>
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
