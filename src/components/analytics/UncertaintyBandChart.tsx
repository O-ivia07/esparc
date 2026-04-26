"use client";
import {
  Area,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { num } from "@/lib/format";

export interface BandDatum {
  year: number;
  p10: number;
  p50: number;
  p90: number;
  band?: [number, number];
}

export function UncertaintyBandChart({
  data,
  yLabel = "kWh/year",
}: {
  data: BandDatum[];
  yLabel?: string;
}) {
  const chartData = data.map((d) => ({ ...d, band: [d.p10, d.p90] as [number, number] }));
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <ComposedChart data={chartData} margin={{ top: 10, right: 24, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: "#64748B" }}
            axisLine={{ stroke: "#CBD5E1" }}
            tickLine={false}
            tickFormatter={(v) => `Yr ${v}`}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#64748B" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
            width={44}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid rgb(15 23 42 / 0.08)",
              boxShadow: "0 8px 24px rgb(0 0 0 / 0.06)",
              padding: 10,
              fontSize: 12,
            }}
            formatter={(v: number, name: string) => [`${num(v)} ${yLabel}`, name]}
            labelFormatter={(l) => `Year ${l}`}
          />
          <Area
            type="monotone"
            dataKey="band"
            stroke="none"
            fill="#0B3B8C"
            fillOpacity={0.12}
            name="P10 / P90 range"
          />
          <Line
            type="monotone"
            dataKey="p50"
            stroke="#0B3B8C"
            strokeWidth={2}
            dot={false}
            name="P50 (central)"
          />
          <Line
            type="monotone"
            dataKey="p10"
            stroke="#0B3B8C"
            strokeDasharray="3 4"
            strokeOpacity={0.5}
            strokeWidth={1}
            dot={false}
            name="P10"
          />
          <Line
            type="monotone"
            dataKey="p90"
            stroke="#0B3B8C"
            strokeDasharray="3 4"
            strokeOpacity={0.5}
            strokeWidth={1}
            dot={false}
            name="P90"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
