"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ActorRole, AuditEvent } from "./types";

interface State {
  role: ActorRole;
  setRole: (r: ActorRole) => void;
  events: AuditEvent[];
  logEvent: (e: Omit<AuditEvent, "timestamp">) => void;
  clearEvents: () => void;
  auditDrawerOpen: boolean;
  setAuditDrawerOpen: (v: boolean) => void;
  assistantOpen: boolean;
  setAssistantOpen: (v: boolean) => void;
}

export const useEsparcStore = create<State>()(
  persist(
    (set) => ({
      role: "lender",
      setRole: (role) => set({ role }),
      events: [],
      logEvent: (e) =>
        set((state) => ({
          events: [{ ...e, timestamp: new Date().toISOString() }, ...state.events].slice(
            0,
            200,
          ),
        })),
      clearEvents: () => set({ events: [] }),
      auditDrawerOpen: false,
      setAuditDrawerOpen: (auditDrawerOpen) => set({ auditDrawerOpen }),
      assistantOpen: false,
      setAssistantOpen: (assistantOpen) => set({ assistantOpen }),
    }),
    { name: "esparc-demo-state", version: 1 },
  ),
);
