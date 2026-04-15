import React, { useState } from "react";

const API_URL = "https://sv47gyej3e.execute-api.us-east-1.amazonaws.com";

const envConfig = {
  dev: { label: "DEV", path: "/dev", color: "#3B6D11", bg: "#EAF3DE", border: "#C0DD97", dot: "#639922" },
  prod: { label: "PROD", path: "/prod", color: "#854F0B", bg: "#FAEEDA", border: "#FAC775", dot: "#BA7517" },
};

function EnvBlock({ env }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | ok | error
  const cfg = envConfig[env];

  const handleQuery = async () => {
    setLoading(true);
    setStatus("loading");
    setMessage("consultando...");
    try {
      const res = await fetch(`${API_URL}${cfg.path}`);
      const data = await res.json();
      setMessage(data.mensaje || JSON.stringify(data));
      setStatus("ok");
    } catch {
      setMessage("error al conectar");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const dotColor = { idle: "#ccc", loading: "#EF9F27", ok: "#1D9E75", error: "#D85A30" }[status];
  const msgColor = message && status !== "idle" ? "#000" : "#999";

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{
          fontFamily: "monospace", fontSize: 10, fontWeight: 600,
          padding: "3px 8px", borderRadius: 4, letterSpacing: "0.05em",
          background: cfg.bg, color: cfg.color, border: `0.5px solid ${cfg.border}`,
        }}>{cfg.label}</span>
        <span style={{ fontFamily: "monospace", fontSize: 11, color: "#999" }}>{cfg.path}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={handleQuery} disabled={loading} style={{
          fontFamily: "sans-serif", fontSize: 13, fontWeight: 600,
          padding: "8px 18px", borderRadius: 8, border: "0.5px solid #ddd",
          background: "#fff", cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.5 : 1,
        }}>Consultar</button>

        <div style={{
          flex: 1, minHeight: 36, background: "#f5f5f3", border: "0.5px solid #e0e0de",
          borderRadius: 8, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: message ? cfg.dot : "#ccc", flexShrink: 0 }} />
          <span style={{ fontFamily: "monospace", fontSize: 12, color: msgColor, flex: 1 }}>
            {message || "— esperando respuesta"}
          </span>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: dotColor, flexShrink: 0 }} />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9f8f6" }}>
      <div style={{
        background: "#fff", borderRadius: 12, border: "0.5px solid #e0e0de",
        padding: "2.5rem", width: "100%", maxWidth: 480,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
          <div style={{
            width: 32, height: 32, background: "#f5f5f3", border: "0.5px solid #e0e0de",
            borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" rx="1" fill="#999"/>
              <rect x="9" y="2" width="5" height="5" rx="1" fill="#999" opacity="0.5"/>
              <rect x="2" y="9" width="5" height="5" rx="1" fill="#999" opacity="0.5"/>
              <rect x="9" y="9" width="5" height="5" rx="1" fill="#999"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em" }}>API Gateway + Lambda</div>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#999", marginTop: 1 }}>sv47gyej3e.execute-api.us-east-1</div>
          </div>
        </div>

        <div style={{ height: "0.5px", background: "#e0e0de", marginBottom: "1.5rem" }} />

        <EnvBlock env="dev" />
        <EnvBlock env="prod" />
      </div>
    </div>
  );
}

export default App;