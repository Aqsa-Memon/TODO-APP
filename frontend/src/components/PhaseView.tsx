"use client";

import { motion } from "framer-motion";
import type { Phase } from "./Sidebar";

interface PhaseViewProps {
  phase: Phase;
}

const glass: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "16px",
  padding: "24px",
};

const techBadge: React.CSSProperties = {
  padding: "5px 14px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  fontSize: "12px",
  color: "rgba(255,255,255,0.5)",
  fontWeight: 500,
};

const phaseDetails: Record<string, { description: string; tech: string[]; features: string[] }> = {
  phase1: {
    description: "A Python console-based todo application with rich formatting. Users interact through a numbered menu system to manage their tasks with full CRUD operations.",
    tech: ["Python 3.13", "Rich Library", "Dataclasses", "In-Memory Storage"],
    features: [
      "Interactive CLI menu with 6 options",
      "Formatted table view of all tasks",
      "Add tasks with title & description",
      "Update task title or description",
      "Toggle task completion status",
      "Delete tasks by ID",
    ],
  },
  phase2: {
    description: "Full-stack web application with a Next.js frontend and FastAPI backend. Features JWT authentication, SQLite database, glassmorphism UI with snowfall animations.",
    tech: ["Next.js 16", "TypeScript", "FastAPI", "SQLModel", "SQLite", "JWT", "Tailwind CSS", "Framer Motion"],
    features: [
      "User signup & login with JWT tokens",
      "Secure REST API with 6 endpoints",
      "Real-time task CRUD operations",
      "Glassmorphism dark theme UI",
      "Snowfall animation effect",
      "3D hover effects on cards",
      "Animated task entry/exit",
      "Edit modal with backdrop blur",
    ],
  },
  phase3: {
    description: "AI-powered chatbot integrated into the todo app. Users can chat with Claude AI to get help managing tasks, get suggestions, and create tasks through natural conversation.",
    tech: ["Claude API", "Streaming Responses", "Chat UI", "Markdown Rendering"],
    features: [
      "Real-time AI chat interface",
      "Create tasks via natural language",
      "AI task suggestions & prioritization",
      "Chat history persistence",
    ],
  },
  phase4: {
    description: "Smart features powered by AI to enhance productivity. Intelligent task management with auto-categorization, priority sorting, and advanced organization tools.",
    tech: ["AI/ML", "Drag & Drop", "Calendar API", "Push Notifications"],
    features: [
      "AI-powered task suggestions",
      "Smart priority auto-sorting",
      "Task categories & color tags",
      "Drag & drop task reordering",
      "Due dates with calendar picker",
    ],
  },
  phase5: {
    description: "Enterprise-grade features for team collaboration, deployment to production, analytics dashboard, and mobile-first progressive web app.",
    tech: ["Vercel", "Neon PostgreSQL", "WebSockets", "PWA", "PDF Export"],
    features: [
      "Production deployment (Vercel + Railway)",
      "Team workspaces & task sharing",
      "Analytics dashboard with charts",
      "Mobile responsive PWA",
      "Export tasks to PDF/CSV",
      "Push notification system",
    ],
  },
};

export default function PhaseView({ phase }: PhaseViewProps) {
  const details = phaseDetails[phase.id];
  const doneCount = phase.tasks.filter((t) => t.done).length;
  const allDone = doneCount === phase.tasks.length;

  return (
    <motion.div
      key={phase.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", flexDirection: "column", gap: "24px" }}
    >
      {/* Phase Header */}
      <div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            fontSize: "11px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "3px",
            color: "rgba(255,255,255,0.2)",
            marginBottom: "8px",
          }}
        >
          {phase.label} — {phase.subtitle}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontSize: "36px",
            fontWeight: 800,
            margin: 0,
            background: "linear-gradient(90deg, #ffffff, rgba(255,255,255,0.35), #ffffff)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 4s ease-in-out infinite",
            letterSpacing: "-1px",
          }}
        >
          {phase.subtitle}
        </motion.h1>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ marginTop: "12px", display: "flex", gap: "8px", alignItems: "center" }}
        >
          <span style={{
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: 600,
            background: allDone ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${allDone ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}`,
            color: allDone ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)",
          }}>
            {allDone ? "Completed" : "In Progress"}
          </span>
          <span style={{
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: 500,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.35)",
          }}>
            {doneCount}/{phase.tasks.length} tasks
          </span>
        </motion.div>
      </div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={glass}
      >
        <p style={{
          fontSize: "10px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "2px",
          color: "rgba(255,255,255,0.2)",
          margin: "0 0 12px 0",
        }}>
          Overview
        </p>
        <p style={{
          fontSize: "14px",
          lineHeight: "1.7",
          color: "rgba(255,255,255,0.55)",
          margin: 0,
        }}>
          {details.description}
        </p>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={glass}
      >
        <p style={{
          fontSize: "10px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "2px",
          color: "rgba(255,255,255,0.2)",
          margin: "0 0 14px 0",
        }}>
          Tech Stack
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {details.tech.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 + i * 0.04 }}
              style={techBadge}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Task Checklist */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        style={glass}
      >
        <p style={{
          fontSize: "10px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "2px",
          color: "rgba(255,255,255,0.2)",
          margin: "0 0 16px 0",
        }}>
          Deliverables
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {phase.tasks.map((task, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.04 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 12px",
                borderRadius: "10px",
                transition: "background 0.2s ease",
              }}
            >
              <div style={{
                width: "20px",
                height: "20px",
                borderRadius: "6px",
                border: task.done ? "none" : "2px solid rgba(255,255,255,0.12)",
                background: task.done ? "rgba(255,255,255,0.12)" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                color: "#fff",
                flexShrink: 0,
              }}>
                {task.done && "✓"}
              </div>
              <span style={{
                fontSize: "14px",
                color: task.done ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.35)",
                fontWeight: task.done ? 400 : 400,
              }}>
                {task.title}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={glass}
      >
        <p style={{
          fontSize: "10px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "2px",
          color: "rgba(255,255,255,0.2)",
          margin: "0 0 14px 0",
        }}>
          Features
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {details.features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.03 }}
              style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
            >
              <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "8px", marginTop: "6px" }}>●</span>
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: "1.5" }}>
                {feat}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
