"use client";

import { AnimatePresence } from "framer-motion";
import type { Task } from "@/lib/api";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

export default function TaskList({ tasks, onToggle, onDelete, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <p
          className="text-lg font-medium"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          No tasks yet
        </p>
        <p
          className="text-sm mt-1"
          style={{ color: "rgba(255,255,255,0.1)" }}
        >
          Add your first task above
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 perspective-container">
      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
