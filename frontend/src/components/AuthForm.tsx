"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface AuthFormProps {
  mode: "login" | "signup";
  onSubmit: (email: string, password: string) => Promise<void>;
}

const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
  padding: "40px",
  width: "100%",
  maxWidth: "400px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 18px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  color: "#fff",
  fontSize: "15px",
  outline: "none",
  transition: "all 0.3s ease",
};

const btnStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  background: "#fff",
  color: "#000",
  border: "none",
  borderRadius: "12px",
  fontSize: "15px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.3s ease",
};

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onSubmit(email, password);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getFocusedInput = (field: string): React.CSSProperties => ({
    ...inputStyle,
    ...(focusedField === field
      ? {
          borderColor: "rgba(255,255,255,0.35)",
          boxShadow: "0 0 20px rgba(255,255,255,0.07), 0 0 40px rgba(255,255,255,0.03)",
        }
      : {}),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        whileHover={{ rotateX: 2, rotateY: -2, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={glassCard}
      >
        <form onSubmit={handleSubmit}>
          {/* Decorative icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            style={{
              width: "56px",
              height: "56px",
              margin: "0 auto 20px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
            }}
          >
            {mode === "login" ? "→" : "✦"}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: "36px",
              fontWeight: 800,
              textAlign: "center",
              marginBottom: "4px",
              background: "linear-gradient(90deg, #ffffff, rgba(255,255,255,0.4), #ffffff)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 4s ease-in-out infinite",
              letterSpacing: "-1px",
            }}
          >
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: "rgba(255,255,255,0.3)",
              marginBottom: "32px",
              lineHeight: "1.5",
            }}
          >
            {mode === "login"
              ? "Sign in to manage your tasks"
              : "Get started with your todo journey"}
          </motion.p>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                padding: "12px 16px",
                borderRadius: "12px",
                fontSize: "13px",
                marginBottom: "20px",
                background: "rgba(255,60,60,0.1)",
                border: "1px solid rgba(255,60,60,0.2)",
                color: "#ff6b6b",
              }}
            >
              {error}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            style={{ marginBottom: "16px" }}
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              required
              style={getFocusedInput("email")}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            style={{ marginBottom: "24px" }}
          >
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              required
              minLength={6}
              style={getFocusedInput("password")}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                ...btnStyle,
                opacity: loading ? 0.5 : 1,
              }}
            >
              {loading ? "..." : mode === "login" ? "Sign In" : "Sign Up"}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
}
