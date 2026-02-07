"use client";

import { motion, AnimatePresence } from "framer-motion";

export interface Phase {
  id: string;
  label: string;
  subtitle: string;
  icon: string;
  tasks: { title: string; done: boolean }[];
}

export const phases: Phase[] = [
  {
    id: "phase1",
    label: "Phase I",
    subtitle: "Console App",
    icon: "01",
    tasks: [
      { title: "Python Console App", done: true },
      { title: "Task Dataclass Model", done: true },
      { title: "In-Memory Task Store", done: true },
      { title: "Rich CLI Menu Interface", done: true },
      { title: "CRUD Operations", done: true },
      { title: "Toggle Task Completion", done: true },
    ],
  },
  {
    id: "phase2",
    label: "Phase II",
    subtitle: "Full-Stack Web App",
    icon: "02",
    tasks: [
      { title: "FastAPI Backend + SQLite", done: true },
      { title: "User Auth (JWT + bcrypt)", done: true },
      { title: "REST API Endpoints (6 routes)", done: true },
      { title: "Next.js Frontend (App Router)", done: true },
      { title: "Login / Signup Pages", done: true },
      { title: "Task Dashboard with CRUD", done: true },
      { title: "Glassmorphism UI + Snowfall", done: true },
      { title: "Framer Motion Animations", done: true },
    ],
  },
  {
    id: "phase3",
    label: "Phase III",
    subtitle: "AI Chatbot",
    icon: "03",
    tasks: [
      { title: "AI Chat Interface", done: false },
      { title: "Claude API Integration", done: false },
      { title: "Chat History Storage", done: false },
      { title: "Task Creation via Chat", done: false },
    ],
  },
  {
    id: "phase4",
    label: "Phase IV",
    subtitle: "Smart Features",
    icon: "04",
    tasks: [
      { title: "AI Task Suggestions", done: false },
      { title: "Smart Priority Sorting", done: false },
      { title: "Task Categories & Tags", done: false },
      { title: "Drag & Drop Reordering", done: false },
      { title: "Due Dates & Reminders", done: false },
    ],
  },
  {
    id: "phase5",
    label: "Phase V",
    subtitle: "Enterprise & Deploy",
    icon: "05",
    tasks: [
      { title: "Deploy to Vercel / Railway", done: false },
      { title: "Team Collaboration", done: false },
      { title: "Analytics Dashboard", done: false },
      { title: "Mobile Responsive PWA", done: false },
      { title: "Export Tasks (PDF/CSV)", done: false },
      { title: "Notification System", done: false },
    ],
  },
];

interface SidebarProps {
  activePhase: string;
  onPhaseChange: (phaseId: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const sidebarStyle: React.CSSProperties = {
  width: "280px",
  minHeight: "100vh",
  background: "rgba(255,255,255,0.02)",
  borderRight: "1px solid rgba(255,255,255,0.06)",
  padding: "0",
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  zIndex: 35,
  backdropFilter: "blur(30px)",
  WebkitBackdropFilter: "blur(30px)",
};

export default function Sidebar({ activePhase, onPhaseChange, collapsed, onToggleCollapse }: SidebarProps) {
  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={onToggleCollapse}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: "fixed",
          top: "18px",
          left: collapsed ? "16px" : "296px",
          zIndex: 50,
          width: "36px",
          height: "36px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "10px",
          color: "rgba(255,255,255,0.5)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          transition: "left 0.3s ease",
        }}
      >
        {collapsed ? ">" : "<"}
      </motion.button>

      <AnimatePresence>
        {!collapsed && (
          <motion.aside
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={sidebarStyle}
          >
            {/* Logo */}
            <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03))",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                marginBottom: "16px",
              }}>
                ✦
              </div>
              <h2 style={{
                fontSize: "10px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "4px",
                color: "rgba(255,255,255,0.2)",
                margin: 0,
              }}>
                Evolution of
              </h2>
              <h1 style={{
                fontSize: "28px",
                fontWeight: 800,
                margin: "4px 0 0 0",
                background: "linear-gradient(90deg, #ffffff, rgba(255,255,255,0.35), #ffffff)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 4s ease-in-out infinite",
                letterSpacing: "-0.5px",
              }}>
                Todo App
              </h1>
            </div>

            {/* Phase list */}
            <div style={{ padding: "16px 16px 0", flex: 1, overflowY: "auto" }}>
              <p style={{
                fontSize: "10px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "rgba(255,255,255,0.2)",
                margin: "0 0 12px 8px",
              }}>
                Project Phases
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {phases.map((phase) => {
                  const isActive = activePhase === phase.id;
                  const doneCount = phase.tasks.filter((t) => t.done).length;
                  const totalCount = phase.tasks.length;
                  const allDone = doneCount === totalCount;

                  return (
                    <motion.button
                      key={phase.id}
                      onClick={() => onPhaseChange(phase.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                        border: isActive ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
                        borderRadius: "12px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        textAlign: "left",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: isActive ? "rgba(255,255,255,0.1)" : allDone ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: isActive ? "#fff" : allDone ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)",
                        flexShrink: 0,
                      }}>
                        {phase.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                          margin: 0,
                        }}>
                          {phase.label}
                        </p>
                        <p style={{
                          fontSize: "11px",
                          color: isActive ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.2)",
                          margin: "1px 0 0 0",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}>
                          {phase.subtitle}
                        </p>
                      </div>
                      {/* Progress */}
                      <div style={{ position: "relative", width: "28px", height: "28px", flexShrink: 0 }}>
                        <svg width="28" height="28" viewBox="0 0 28 28">
                          <circle cx="14" cy="14" r="11" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
                          <circle
                            cx="14" cy="14" r="11" fill="none"
                            stroke={allDone ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)"}
                            strokeWidth="2"
                            strokeDasharray={`${(doneCount / totalCount) * 69.1} 69.1`}
                            strokeLinecap="round"
                            transform="rotate(-90 14 14)"
                            style={{ transition: "all 0.5s ease" }}
                          />
                        </svg>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.15)", margin: 0, textAlign: "center" }}>
                Hackathon Project 2026
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
