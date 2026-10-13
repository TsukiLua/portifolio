import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagem de compartilhamento gerada no build a partir do perfil (sem foto obrigatória). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#f4f3ef", color: "#0f0f12" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 16, background: "#0f0f12", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700 }}>
            {profile.monogram}
          </div>
          <div style={{ fontSize: 30, color: "#5f5f67" }}>{profile.role}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>Sites que trabalham pelo seu negócio.</div>
          <div style={{ marginTop: 24, fontSize: 30, color: "#4636e3" }}>{profile.name}</div>
        </div>
      </div>
    ),
    size,
  );
}
