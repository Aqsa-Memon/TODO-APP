"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Task } from "@/lib/api";

interface EditTaskModalProps {
  task: Task;
  onSave: (id: number, data: { title?: string; description?: string }) => Promise<void>;
  onClose: () => void;
}

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

export default function EditTaskModal({ task, onSave, onClose }: EditTaskModalProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(task.id, { title, description });
      onClose();
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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 40,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(8px)",
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotateX: -10 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.85, rotateX: 10 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            padding: "32px",
            width: "100%",
            maxWidth: "440px",
            perspective: "1000px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px", textShadow: "0 0 30px rgba(255,255,255,0.1)" }}>
            Edit Task
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 500, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.3)" }}>
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={() => setFocusedField("title")}
                onBlur={() => setFocusedField(null)}
                required
                style={getFocusedInput("title")}
              />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 500, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.3)" }}>
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onFocus={() => setFocusedField("desc")}
                onBlur={() => setFocusedField(null)}
                placeholder="Description"
                style={getFocusedInput("desc")}
              />
            </div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "10px 20px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "10px 20px",
                  background: "#fff",
                  color: "#000",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  opacity: loading ? 0.5 : 1,
                }}
              >
                {loading ? "..." : "Save Changes"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
