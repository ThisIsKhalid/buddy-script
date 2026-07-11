"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isInitialized, checkSession } = useAuth();

  useEffect(() => {
    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isInitialized) {
    // Elegant full-screen loading skeleton matching the Poppins font style
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontFamily: "Poppins, sans-serif",
          backgroundColor: "#f5f7fb",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid #e1e8ed",
              borderTop: "3px solid #3f51b5",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 15px auto",
            }}
          />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <span style={{ color: "#5f72a5", fontSize: "14px", fontWeight: 500 }}>
            Loading Buddy Script...
          </span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
