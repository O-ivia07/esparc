"use client";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import type { YearRow } from "@/lib/engine/cashflow";
import { num } from "@/lib/format";

export function CashFlowChart({ data }: { data: YearRow[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 24, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis
            dataKey="year"
            tickFormatter={(v) => `Yr ${v}`}
            tick={{ fontSize: 11, fill: "#64748B" }}
            axisLine={{ stroke: "#CBD5E1" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#64748B" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `$${Math.round(v / 1000)}k`}
            width={52}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid rgb(15 23 42 / 0.08)",
              boxShadow: "0 8px 24px rgb(0 0 0 / 0.06)",
              padding: 10,
              fontSize: 12,
            }}
            formatter={(v: number, name: string) => [`$${num(v)}`, name]}
            labelFormatter={(l) => `Year ${l}`}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line
            type="monotone"
            dataKey="scenarioBase"
            stroke="#16A34A"
            strokeWidth={2}
            dot={false}
            name="Base case"
          />
          <Line
            type="monotone"
            dataKey="scenarioConservative"
            stroke="#D97706"
            strokeWidth={2}
            dot={false}
            name="Conservative"
          />
          <Line
            type="monotone"
            dataKey="scenarioStress"
            stroke="#DC2626"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={false}
            name="Stress"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DscrChart({ data }: { data: YearRow[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 24, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis
            dataKey="year"
            tickFormatter={(v) => `Yr ${v}`}
            tick={{ fontSize: 11, fill: "#64748B" }}
            axisLine={{ stroke: "#CBD5E1" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#64748B" }}
            axisLine={false}
            tickLine={false}
            domain={[0.8, 2.2]}
            tickFormatter={(v) => `${v.toFixed(2)}×`}
            width={48}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid rgb(15 23 42 / 0.08)",
              boxShadow: "0 8px 24px rgb(0 0 0 / 0.06)",
              padding: 10,
              fontSize: 12,
            }}
            formatter={(v: number, name: string) => [v.toFixed(2), name]}
            labelFormatter={(l) => `Year ${l}`}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line
            type="monotone"
            dataKey="dscrP10"
            stroke="#D97706"
            strokeWidth={1.5}
            dot={false}
            name="P10 DSCR"
          />
          <Line
            type="monotone"
            dataKey="dscrP50"
            stroke="#0B3B8C"
            strokeWidth={2}
            dot={false}
            name="P50 DSCR"
          />
          <Line
            type="monotone"
            dataKey="dscrP90"
            stroke="#16A34A"
            strokeWidth={1.5}
            dot={false}
            name="P90 DSCR"
          />
          <Line
            type="monotone"
            dataKey={() => 1.25}
            stroke="#DC2626"
            strokeWidth={1}
            strokeDasharray="6 4"
            dot={false}
            name="Policy floor 1.25×"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
