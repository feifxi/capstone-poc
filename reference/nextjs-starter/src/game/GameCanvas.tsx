"use client";

import { useEffect, useRef } from "react";

// placeholder — ของจริงเอา Phaser.Game มา mount ตรงนี้ (ดู b1-phaser-tilemap/src/Game.tsx)
// จุดที่ต้องจำ: destroy ใน cleanup ของ useEffect ไม่งั้น fast-refresh จะ leak instance

export default function GameCanvas() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    el.textContent = "🎮 Phaser.Game mount ตรงนี้";
    // const Phaser = await import("phaser");
    // const game = new Phaser.Game({ parent: el, ... });
    return () => {
      // game.destroy(true);
      el.textContent = "";
    };
  }, []);

  return <div ref={ref} style={{ width: 640, height: 480, border: "1px solid #999", display: "grid", placeItems: "center" }} />;
}
