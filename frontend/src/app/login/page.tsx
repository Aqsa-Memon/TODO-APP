"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import AuthForm from "@/components/AuthForm";
import { login } from "@/lib/api";
import { saveAuth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const res = await login(email, password);
    saveAuth(res.access_token, res.user_id);
    router.push("/tasks");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", background: "#000" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
        <AuthForm mode="login" onSubmit={handleLogin} />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{ fontSize: "14px", color: "rgba(255,255,255,0.35)" }}
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", transition: "color 0.2s" }}
          >
            Sign up
          </Link>
        </motion.p>
      </div>
    </div>
  );
}
