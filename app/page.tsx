"use client";

import { useEffect, useState } from "react";
{/*To edit: temporary vibe coded backend*/}
type Reading = {
  pm25: number;
  voc: number;
  temp: number;
  airflow: number;
  timestamp: string;
};

export default function Home() {
  const [reading, setReading] = useState<Reading | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatest() {
      try {
        const res = await fetch("/api/readings/latest");
        const data = await res.json();
        setReading(data);
      } catch (err) {
        console.error("Failed to fetch reading:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLatest();
    const interval = setInterval(fetchLatest, 5000); // poll every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1a24] text-white p-8 font-mono">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-xs tracking-widest text-[#6b7a86] uppercase">
            FluxLabs / Monitoring
          </p>
          <h1 className="text-3xl font-bold tracking-wide mt-1">DASHBOARD</h1>
        </div>
        <div className="text-xs text-[#6b7a86] tracking-widest">
          SYSTEM{" "}
          <span className={reading ? "text-[#7ea88a]" : "text-[#6b7a86]"}>
            ● {reading ? "ONLINE" : "OFFLINE"}
          </span>
        </div>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-[#16232e] border-l-4 border-[#7ea88a] p-6">
          <p className="text-xs tracking-widest text-[#6b7a86] uppercase">
            Current Exposure
          </p>
          <p className="text-4xl font-bold mt-3 text-[#6b7a86]">
            {loading ? "…" : reading ? reading.pm25 : "—"}
          </p>
          <p className="text-xs text-[#6b7a86] mt-1">
            {reading ? "µg/m³" : "No data yet"}
          </p>
        </div>

        <div className="bg-[#16232e] border-l-4 border-[#c9a876] p-6">
          <p className="text-xs tracking-widest text-[#6b7a86] uppercase">
            Extraction Status
          </p>
          <p className="text-4xl font-bold mt-3 text-[#6b7a86]">
            {loading ? "…" : reading ? `${reading.airflow}%` : "—"}
          </p>
          <p className="text-xs text-[#6b7a86] mt-1">
            {reading ? "Airflow" : "No data yet"}
          </p>
        </div>
      </div>

      {/* Sensor cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {["PM-01", "GAS-01", "TMP-01", "AIR-01"].map((id) => (
          <div key={id} className="bg-[#16232e] p-5">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs tracking-widest">{id}</p>
              <span
                className={`w-2 h-2 rounded-full ${
                  reading ? "bg-[#7ea88a]" : "bg-[#6b7a86]"
                }`}
              />
            </div>
            <p className="text-2xl font-bold text-[#6b7a86]">—</p>
            <p className="text-xs text-[#6b7a86] mt-2">
              {reading ? "LIVE" : "NO DATA"}
            </p>
          </div>
        ))}
      </div>

      {/* Telemetry history */}
      <div className="bg-[#16232e] p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs tracking-widest text-[#6b7a86] uppercase">
              Telemetry
            </p>
            <p className="font-bold tracking-wide">EXPOSURE HISTORY</p>
          </div>
          <p className="text-xs text-[#6b7a86]">LAST 24 HOURS</p>
        </div>
        <div className="h-40 flex items-center justify-center text-[#6b7a86] text-sm border border-[#24333f]">
          {/* chart component goes here later */}
          No telemetry data yet
        </div>
      </div>

      {/* Summary + Notifications */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#16232e] p-6">
          <p className="text-xs tracking-widest text-[#6b7a86] uppercase">
            Session
          </p>
          <p className="font-bold tracking-wide mb-3">EXPOSURE SUMMARY</p>
          <p className="text-3xl font-bold text-[#6b7a86]">—:—:—</p>
        </div>

        <div className="bg-[#16232e] p-6">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-xs tracking-widest text-[#6b7a86] uppercase">
                Recent Events
              </p>
              <p className="font-bold tracking-wide">NOTIFICATIONS</p>
            </div>
          </div>
          <p className="text-sm text-[#6b7a86]">No notifications yet</p>
        </div>
      </div>
    </div>
  );
}