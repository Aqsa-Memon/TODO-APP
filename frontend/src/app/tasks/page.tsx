"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { isLoggedIn, logout } from "@/lib/auth";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleComplete,
  type Task,
} from "@/lib/api";
import AddTaskForm from "@/components/AddTaskForm";
import TaskList from "@/components/TaskList";
import EditTaskModal from "@/components/EditTaskModal";
import Sidebar, { phases } from "@/components/Sidebar";
import PhaseView from "@/components/PhaseView";

const headerGlass: React.CSSProperties = {
  background: "rgba(255,255,255,0.02)",
  backdropFilter: "blur(30px)",
  WebkitBackdropFilter: "blur(30px)",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  position: "sticky",
  top: 0,
  zIndex: 30,
};

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editing, setEditing] = useState<Task | null>(null);
  const [error, setError] = useState("");
  const [activePhase, setActivePhase] = useState("phase2");
  const [collapsed, setCollapsed] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch {
      setError("Failed to load tasks");
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
      return;
    }
    fetchTasks();
  }, [router, fetchTasks]);

  const handleAdd = async (title: string, description: string) => {
    await createTask(title, description);
    fetchTasks();
  };

  const handleToggle = async (id: number) => {
    await toggleComplete(id);
    fetchTasks();
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleEdit = async (
    id: number,
    data: { title?: string; description?: string }
  ) => {
    await updateTask(id, data);
    fetchTasks();
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;
  const selectedPhase = phases.find((p) => p.id === activePhase) || phases[0];

  return (
    <div style={{ minHeight: "100vh", background: "#000", display: "flex" }}>
      <Sidebar
        activePhase={activePhase}
        onPhaseChange={setActivePhase}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
      />

      {/* Main Content - offset by sidebar width */}
      <div style={{
        flex: 1,
        marginLeft: collapsed ? "0px" : "280px",
        minHeight: "100vh",
        transition: "margin-left 0.3s ease",
      }}>
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={headerGlass}
        >
          <div style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "20px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  color: "rgba(255,255,255,0.2)",
                  marginBottom: "4px",
                }}
              >
                {selectedPhase.label}
              </motion.div>
              <motion.h1
                key={activePhase}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                style={{
                  fontSize: "32px",
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
                {activePhase === "phase2" ? "My Tasks" : selectedPhase.subtitle}
              </motion.h1>
              {activePhase === "phase2" && tasks.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  style={{ display: "flex", gap: "6px", marginTop: "8px", alignItems: "center" }}
                >
                  <span style={{
                    fontSize: "11px",
                    padding: "3px 10px",
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.5)",
                    fontWeight: 500,
                  }}>
                    {pendingCount} pending
                  </span>
                  <span style={{
                    fontSize: "11px",
                    padding: "3px 10px",
                    borderRadius: "20px",
                    background: completedCount > 0 ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${completedCount > 0 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
                    color: completedCount > 0 ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)",
                    fontWeight: 500,
                  }}>
                    {completedCount} done
                  </span>
                </motion.div>
              )}
            </div>
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "8px 18px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                color: "rgba(255,255,255,0.4)",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Log out
            </motion.button>
          </div>
        </motion.header>

        {/* Content */}
        <main style={{ maxWidth: "800px", margin: "0 auto", padding: "32px" }}>
          <AnimatePresence mode="wait">
            {activePhase === "phase2" ? (
              <motion.div
                key="phase2-tasks"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{ display: "flex", flexDirection: "column", gap: "28px" }}
              >
                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      fontSize: "13px",
                      background: "rgba(255,60,60,0.1)",
                      border: "1px solid rgba(255,60,60,0.2)",
                      color: "#ff6b6b",
                    }}
                  >
                    {error}
                  </motion.div>
                )}

                <AddTaskForm onAdd={handleAdd} />

                {tasks.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <p style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      color: "rgba(255,255,255,0.2)",
                      margin: 0,
                    }}>
                      All Tasks
                    </p>
                    <div style={{
                      flex: 1,
                      height: "1px",
                      background: "rgba(255,255,255,0.05)",
                    }} />
                  </motion.div>
                )}

                <TaskList
                  tasks={tasks}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onEdit={setEditing}
                />

                {editing && (
                  <EditTaskModal
                    task={editing}
                    onSave={handleEdit}
                    onClose={() => setEditing(null)}
                  />
                )}
              </motion.div>
            ) : (
              <motion.div
                key={activePhase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <PhaseView phase={selectedPhase} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
