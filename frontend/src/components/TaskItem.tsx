"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Task } from "@/lib/api";

interface TaskItemProps {
  task: Task;
  index: number;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const glass: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "14px",
  padding: "16px 20px",
};

const checkboxBase: React.CSSProperties = {
  appearance: "none",
  WebkitAppearance: "none",
  width: "22px",
  height: "22px",
  minWidth: "22px",
  border: "2px solid rgba(255,255,255,0.15)",
  borderRadius: "6px",
  background: "rgba(255,255,255,0.03)",
  cursor: "pointer",
  transition: "all 0.3s ease",
  position: "relative",
};

const ghostBtn: React.CSSProperties = {
  padding: "6px 14px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  color: "rgba(255,255,255,0.6)",
  fontSize: "13px",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

export default function TaskItem({ task, index, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.8 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={{ scale: 1.02, rotateX: 1, rotateY: -1 }}
      style={{
        ...glass,
        boxShadow: hover
          ? "0 0 30px rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.3)"
          : "0 2px 10px rgba(0,0,0,0.2)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <motion.div whileTap={{ scale: 0.8 }} style={{ display: "flex" }}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            style={{
              ...checkboxBase,
              ...(task.completed
                ? { background: "#fff", borderColor: "#fff" }
                : {}),
            }}
          />
        </motion.div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontWeight: 500,
              fontSize: "15px",
              color: task.completed ? "rgba(255,255,255,0.25)" : "#fff",
              textDecoration: task.completed ? "line-through" : "none",
              transition: "all 0.3s ease",
              margin: 0,
            }}
          >
            {task.title}
          </p>
          {task.description && (
            <p
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.3)",
                margin: "4px 0 0 0",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {task.description}
            </p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: hover ? 1 : 0, x: hover ? 0 : 10 }}
          transition={{ duration: 0.2 }}
          style={{ display: "flex", gap: "8px", flexShrink: 0 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(task)}
            style={ghostBtn}
          >
            Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(task.id)}
            style={{
              ...ghostBtn,
              background: "rgba(255,60,60,0.08)",
              border: "1px solid rgba(255,60,60,0.15)",
              color: "#ff6b6b",
            }}
          >
            Delete
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
