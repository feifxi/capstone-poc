"use client";

import dynamic from "next/dynamic";

// ⚠️ Next 15.5+: `ssr:false` ใช้ใน Server Component ไม่ได้แล้ว → ต้องมี client wrapper แบบนี้
// pattern สำหรับทั้งโปรเจกต์: Phaser component ทุกตัวโหลดผ่านไฟล์ "use client" ที่ทำ dynamic import
const Game = dynamic(() => import("./Game"), {
  ssr: false, // ไม่ให้ Next render Phaser บน server (ไม่มี window)
  loading: () => <p>loading game…</p>,
});

export default function GameClient() {
  return <Game />;
}
