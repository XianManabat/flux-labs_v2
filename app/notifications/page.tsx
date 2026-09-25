"use client";

import { useEffect, useState } from "react";

type Notification = {
  id: number;
  title: string;
  message: string;
  severity: "unsafe" | "caution" | "system";
  timestamp: string;
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "unsafe" | "caution" | "system">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  const filtered =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.severity === filter);

  const severityColor = {
    unsafe: "border-red-500",
    caution: "border-[#c9a876]",
    system: "border-[#7ea88a]",
  };

  return (
    <div className="min-h-screen bg-[#0f1a24] text-white p-8 font-mono">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-xs tracking-widest text-[#6b7a86] uppercase">
            FluxLabs / System Events
          </p>
          <h1 className="text-3xl font-bold tracking-wide mt-1">
            NOTIFICATIONS
          </h1>
        </div>
        <div className="text-xs text-[#6b7a86] tracking-widest">
          ● MONITORING
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-3 mb-6">
        {(["all", "unsafe", "caution", "system"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-xs tracking-widest uppercase border ${
              filter === tab
                ? "bg-[#c9a876] text-[#0f1a24] border-[#c9a876]"
                : "border-[#24333f] text-[#6b7a86]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="text-[#6b7a86] text-sm">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-[#6b7a86] text-sm">No notifications yet</div>
        ) : (
          filtered.map((n) => (
            <div
              key={n.id}
              className={`bg-[#16232e] border-l-4 ${severityColor[n.severity]} p-5 flex justify-between items-start`}
            >
              <div>
                <p className="font-bold tracking-wide text-sm uppercase">
                  {n.title}
                </p>
                <p className="text-xs text-[#6b7a86] mt-1">{n.message}</p>
              </div>
              <p className="text-xs text-[#6b7a86]">{n.timestamp}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}