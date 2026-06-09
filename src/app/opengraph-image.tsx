import { ImageResponse } from "next/og";
import { profile, hero } from "@/content/site";

// All text derives from the single source of truth in content/site.ts.
const headline = hero.statement.map((s) => s.text).join("");
const signal = hero.signals[0];

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0B0E",
          padding: "72px",
          color: "#ECEDF1",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              border: "1px solid #26272E",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: 600,
              color: "#7C7AF0",
            }}
          >
            {profile.initials}
          </div>
          <div style={{ display: "flex", fontSize: "24px", color: "#9A9DA8" }}>{profile.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: "30px", letterSpacing: "0.12em", color: "#7C7AF0" }}>
            {profile.title.toUpperCase()}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "22px",
              fontSize: "60px",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: "940px",
            }}
          >
            {headline}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", fontSize: "26px", color: "#9A9DA8" }}>{hero.kicker}</div>
          <div style={{ display: "flex", fontSize: "24px", color: "#ECEDF1" }}>
            {signal.value} — {signal.label}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
