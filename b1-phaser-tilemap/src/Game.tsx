"use client";

import { useEffect, useRef } from "react";

// ⚠️ บทเรียน Next + Phaser (จุดที่ context หัวข้อ 11 บอกว่า Next แพง):
// 1. ไฟล์นี้ต้อง "use client" และถูก import แบบ dynamic({ ssr: false }) จาก page.tsx
//    เพราะ Phaser แตะ window/document ตั้งแต่ import
// 2. ต้อง destroy game ใน cleanup ของ useEffect ไม่งั้น fast-refresh จะ leak Phaser.Game ซ้อนกัน
// 3. import Phaser แบบ dynamic ข้างใน useEffect กันไม่ให้ bundle หลุดไป server

export default function Game() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<unknown>(null);

  useEffect(() => {
    let destroyed = false;

    (async () => {
      const Phaser = await import("phaser");
      const { WorldScene } = await import("./WorldScene");
      if (destroyed) return;

      gameRef.current = new Phaser.Game({
        type: Phaser.AUTO,
        parent: containerRef.current!,
        width: 640,
        height: 480,
        backgroundColor: "#1d2021",
        physics: { default: "arcade", arcade: { debug: false } },
        scene: [WorldScene],
      });
    })();

    return () => {
      destroyed = true;
      // @ts-expect-error dynamic type
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return <div ref={containerRef} style={{ width: 640, height: 480 }} />;
}
