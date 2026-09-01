"use client";

import dynamic from "next/dynamic";

// ⭐ pattern เดียวที่ต้องจำสำหรับทั้งโปรเจกต์
// Next 15.5+: ssr:false ใช้ใน Server Component ไม่ได้ → ต้องมี client wrapper แบบนี้
// Phaser / anything ที่แตะ window ตอน import → โหลดผ่านไฟล์นี้เท่านั้น
const GameCanvas = dynamic(() => import("./GameCanvas"), {
  ssr: false,
  loading: () => <p>loading…</p>,
});

export default function GameCanvasClient() {
  return <GameCanvas />;
}
