import { ImageResponse } from "next/og";

export const alt = "MyTools — Application de Gestion de Garage";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "64px 80px",
        }}
      >
        {/* Red accent circle */}
        <div
          style={{
            position: "absolute",
            right: "80px",
            top: "80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "#1A0000",
          }}
        />

        {/* Top — brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              background: "#DC2626",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            MT
          </div>
          <span style={{ color: "#555555", fontSize: "13px", letterSpacing: "4px", fontFamily: "monospace" }}>
            MYTOOLSGROUP.EU
          </span>
        </div>

        {/* Center — title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ color: "#FFFFFF", fontSize: "112px", letterSpacing: "8px", lineHeight: 1, fontFamily: "monospace", fontWeight: "bold" }}>
              MY
            </span>
            <span style={{ color: "#DC2626", fontSize: "112px", letterSpacing: "8px", lineHeight: 1, fontFamily: "monospace", fontWeight: "bold" }}>
              TOOLS
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ width: "48px", height: "2px", background: "#DC2626" }} />
            <span style={{ color: "#555555", fontSize: "16px", letterSpacing: "6px", fontFamily: "monospace" }}>
              APPLICATION DE GESTION DE GARAGE
            </span>
          </div>
        </div>

        {/* Bottom — tags */}
        <div style={{ display: "flex", gap: "10px" }}>
          {["Devis", "Factures", "Clients", "Réservations", "Services", "PWA Live"].map((tag) => (
            <div
              key={tag}
              style={{
                border: "1px solid #2A2A2A",
                borderRadius: "8px",
                padding: "8px 16px",
                color: "#555555",
                fontSize: "12px",
                letterSpacing: "3px",
                fontFamily: "monospace",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
