import { useState, useEffect, type ReactNode } from "react";
import { login, isTokenValid } from "../../lib/analyticsApi";

const TOKEN_KEY = "_analytics_jwt";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (stored && isTokenValid(stored)) {
      setToken(stored);
    }
    setLoading(false);
  }, []);

  const authenticate = async (password: string) => {
    const t = await login(password);
    localStorage.setItem(TOKEN_KEY, t);
    setToken(t);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  return { token, loading, authenticate, logout };
}

export function AuthGate({
  token,
  authenticate,
  children,
}: {
  token: string | null;
  authenticate: (password: string) => Promise<void>;
  children: ReactNode;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (token) return <>{children}</>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await authenticate(password);
    } catch {
      setError("Invalid password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      data-standard-cursor
      style={{
        minHeight: "100vh",
        background: "#fafafa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 32,
          width: 360,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            color: "#111",
            fontSize: 20,
            fontWeight: 600,
            margin: 0,
            textAlign: "center",
          }}
        >
          Analytics
        </h1>
        <p
          style={{
            color: "#6b7280",
            fontSize: 14,
            margin: 0,
            textAlign: "center",
          }}
        >
          Enter password to access dashboard
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          style={{
            background: "#f9fafb",
            border: "1px solid #d1d5db",
            borderRadius: 8,
            color: "#111",
            padding: "10px 14px",
            fontSize: 14,
            outline: "none",
          }}
        />
        {error && (
          <p style={{ color: "#ef4444", fontSize: 13, margin: 0 }}>{error}</p>
        )}
        <button
          type="submit"
          disabled={submitting}
          style={{
            background: "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 0",
            fontSize: 14,
            fontWeight: 500,
            cursor: submitting ? "wait" : "pointer",
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
