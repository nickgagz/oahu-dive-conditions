"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#f1f5f9" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "0.75rem",
              padding: "2rem",
              maxWidth: "28rem",
              textAlign: "center",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              border: "1px solid #e2e8f0",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🌊</div>
            <h1 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1e293b" }}>
              Something went wrong
            </h1>
            <p style={{ fontSize: "0.875rem", color: "#64748b", marginTop: "0.5rem", lineHeight: 1.6 }}>
              The app encountered an unexpected error. Please try refreshing.
            </p>
            <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.5rem", justifyContent: "center" }}>
              <button
                onClick={reset}
                style={{
                  background: "#2563eb",
                  color: "white",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  padding: "0.625rem 1.5rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Try Again
              </button>
              <a
                href="/"
                style={{
                  background: "#f1f5f9",
                  color: "#475569",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  padding: "0.625rem 1.5rem",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Go Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

