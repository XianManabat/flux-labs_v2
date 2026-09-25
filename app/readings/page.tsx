"use client";

import { useEffect, useState } from "react";

type Reading = {
  id: number;
  timestamp: string;
  pm25: number;
  voc: number;
  temp: number;
  airflow: number;
  status: "SAFE" | "CAUTION" | "UNSAFE";
};

export default function Readings() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [selected, setSelected] = useState<Reading | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReadings() {
      try {
        const res = await fetch("/api/readings");
        const data = await res.json();
        setReadings(data);
      } catch (err) {
        console.error("Failed to fetch readings:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchReadings();
    const interval = setInterval(fetchReadings, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1a24] text-white p-8 font-mono">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-xs tracking-widest text-[#6b7a86] uppercase">
            FluxLabs / Telemetry
          </p>
          <h1 className="text-3xl font-bold tracking-wide mt-1">
            SENSOR READINGS
          </h1>
        </div>
        <div className="text-xs text-[#6b7a86] tracking-widest">
          ● {readings.length > 0 ? "LIVE" : "IDLE"}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div>
          <p className="text-xs text-[#6b7a86] tracking-widest mb-1">
            SENSOR SOURCE
          </p>
          <select className="bg-[#16232e] border border-[#24333f] px-3 py-2 text-sm">
            <option>ALL SENSORS</option>
          </select>
        </div>
        <div>
          <p className="text-xs text-[#6b7a86] tracking-widest mb-1">
            TIME RANGE
          </p>
          <select className="bg-[#16232e] border border-[#24333f] px-3 py-2 text-sm">
            <option>LAST 24 HOURS</option>
          </select>
        </div>
        <button className="self-end bg-[#c9a876] text-[#0f1a24] px-4 py-2 text-sm font-bold">
          EXPORT DATA
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#16232e] p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs tracking-widest text-[#6b7a86] uppercase">
              Telemetry Database
            </p>
            <p className="font-bold tracking-wide">COMPLETE SENSOR LOG</p>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[#6b7a86] text-xs border-b border-[#24333f]">
              <th className="pb-3 font-normal">TIME</th>
              <th className="pb-3 font-normal">PM2.5</th>
              <th className="pb-3 font-normal">VOC</th>
              <th className="pb-3 font-normal">TEMP</th>
              <th className="pb-3 font-normal">AIRFLOW</th>
              <th className="pb-3 font-normal">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-[#6b7a86]">
                  Loading...
                </td>
              </tr>
            ) : readings.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-[#6b7a86]">
                  No sensor data yet
                </td>
              </tr>
            ) : (
              readings.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => setSelected(r)}
                  className="border-b border-[#24333f] cursor-pointer hover:bg-[#1c2b38]"
                >
                  <td className="py-3">{r.timestamp}</td>
                  <td className="py-3">{r.pm25} µg/m³</td>
                  <td className="py-3">{r.voc} ppb</td>
                  <td className="py-3">{r.temp} °C</td>
                  <td className="py-3">{r.airflow}%</td>
                  <td className="py-3">{r.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Selected record details */}
      <div className="bg-[#16232e] p-6">
        <p className="text-xs tracking-widest text-[#6b7a86] uppercase">
          Selected Record
        </p>
        <p className="font-bold tracking-wide mb-4">READING DETAILS</p>

        <div className="grid grid-cols-3 gap-6">
          {[
            { label: "TIMESTAMP", value: selected?.timestamp },
            { label: "PM2.5", value: selected?.pm25 },
            { label: "VOC", value: selected?.voc },
            { label: "TEMPERATURE", value: selected?.temp },
            { label: "AIRFLOW", value: selected?.airflow },
            { label: "CLASSIFICATION", value: selected?.status },
          ].map((field) => (
            <div key={field.label} className="border border-[#24333f] p-4">
              <p className="text-xs text-[#6b7a86] tracking-widest mb-2">
                {field.label}
              </p>
              <p className="text-lg">{field.value ?? "—"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}