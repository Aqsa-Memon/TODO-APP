"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface AddTaskFormProps {
  onAdd: (title: string, description: string) => Promise<void>;
}

const glass: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
  padding: "24px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  color: "#fff",
  fontSize: "14px",
  outline: "none",
  transition: "all 0.3s ease",
};

export default function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      await onAdd(title.trim(), description.trim());
      setTitle("");
      setDescription("");
    } finally {
      setLoading(false);
    }
  };

  const getFocusedInput = (field: string): React.CSSProperties => ({
    ...inputStyle,
    ...(focusedField === field
      ? {
          borderColor: "rgba(255,255,255,0.3)",
          boxShadow: "0 0 15px rgba(255,255,255,0.06)",
        }
      : {}),
  });

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={glass}
    >
      <div style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", fontSize: "11px", fontWeight: 500, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.3)" }}>
            Task
          </label>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setFocusedField("title")}
            onBlur={() => setFocusedField(null)}
            required
            style={getFocusedInput("title")}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", fontSize: "11px", fontWeight: 500, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.3)" }}>
            Description
          </label>
          <input
            type="text"
            placeholder="Optional details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={() => setFocusedField("desc")}
            onBlur={() => setFocusedField(null)}
            style={getFocusedInput("desc")}
          />
        </div>
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,255,255,0.15)" }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: "12px 24px",
            background: "#fff",
            color: "#000",
            border: "none",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            opacity: loading ? 0.5 : 1,
            whiteSpace: "nowrap",
          }}
        >
          {loading ? "..." : "Add Task"}
        </motion.button>
      </div>
    </motion.form>
  );
}
