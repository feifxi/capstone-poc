"use client";

import { Client, Room } from "colyseus.js";
import { useEffect, useRef, useState } from "react";

const REALTIME_URL = process.env.NEXT_PUBLIC_REALTIME_URL || "ws://localhost:2567";
const SPEED = 3; // px ต่อ frame
const SEND_HZ = 10;

type View = { x: number; y: number; dir: number; name: string };
// ตำแหน่งที่ "วาดจริง" บนจอ (คนละตัวกับตำแหน่งจาก server) — ไว้ทำ interpolation
type Rendered = Record<string, { x: number; y: number }>;

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState("connecting…");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const keys: Record<string, boolean> = {};
    const onDown = (e: KeyboardEvent) => (keys[e.key] = true);
    const onUp = (e: KeyboardEvent) => (keys[e.key] = false);
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);

    let room: Room | undefined;
    let raf = 0;
    let sendTimer: ReturnType<typeof setInterval>;

    // ตำแหน่งของ "ฉัน" — เดินทันทีจาก keyboard (client prediction แบบง่ายสุด)
    const me = { x: 300, y: 250, dir: 0 };
    // ตำแหน่งดิบจาก server ของทุกคน
    const serverPlayers: Record<string, View> = {};
    // ตำแหน่งที่วาด (ค่อยๆ ไล่ตาม server = interpolation)
    const rendered: Rendered = {};
    let myId = "";

    (async () => {
      const client = new Client(REALTIME_URL);
      room = await client.joinOrCreate("world", { name: "me-" + Math.floor(Math.random() * 1000) });
      myId = room.sessionId;
      setStatus("connected: " + myId);

      // onStateChange.once เอา state เริ่มต้น / จากนั้น listen ที่ map
      room.state.players.onAdd((p: any, id: string) => {
        serverPlayers[id] = { x: p.x, y: p.y, dir: p.dir, name: p.name };
        rendered[id] = { x: p.x, y: p.y };
        p.onChange(() => {
          serverPlayers[id] = { x: p.x, y: p.y, dir: p.dir, name: p.name };
        });
        setCount(Object.keys(serverPlayers).length);
      });
      room.state.players.onRemove((_: any, id: string) => {
        delete serverPlayers[id];
        delete rendered[id];
        setCount(Object.keys(serverPlayers).length);
      });
    })();

    // ส่งตำแหน่งฉันขึ้น server ที่ SEND_HZ (ไม่ใช่ทุก frame — ลด traffic)
    sendTimer = setInterval(() => {
      room?.send("move", { x: me.x, y: me.y, dir: me.dir });
    }, 1000 / SEND_HZ);

    // render loop
    const ctx = canvasRef.current!.getContext("2d")!;
    const loop = () => {
      // 1) ขยับฉันจาก keyboard
      let dx = 0, dy = 0;
      if (keys["ArrowUp"] || keys["w"]) dy -= 1;
      if (keys["ArrowDown"] || keys["s"]) dy += 1;
      if (keys["ArrowLeft"] || keys["a"]) dx -= 1;
      if (keys["ArrowRight"] || keys["d"]) dx += 1;
      if (dx || dy) {
        const len = Math.hypot(dx, dy);
        me.x += (dx / len) * SPEED;
        me.y += (dy / len) * SPEED;
        me.dir = Math.atan2(dy, dx);
      }

      // 2) interpolate คนอื่น: rendered ค่อยๆ เข้าหา serverPlayers (lerp 0.2)
      //    ลองเปลี่ยนเป็น 1.0 (snap) แล้วดูว่ากระตุกต่างกันแค่ไหน = คำถามของ A1
      for (const id in serverPlayers) {
        if (id === myId) continue;
        const r = rendered[id] ?? (rendered[id] = { ...serverPlayers[id] });
        r.x += (serverPlayers[id].x - r.x) * 0.2;
        r.y += (serverPlayers[id].y - r.y) * 0.2;
      }

      // 3) วาด
      ctx.clearRect(0, 0, 640, 480);
      ctx.fillStyle = "#eee";
      ctx.fillRect(0, 0, 640, 480);
      for (const id in serverPlayers) {
        const isMe = id === myId;
        const pos = isMe ? me : rendered[id];
        if (!pos) continue;
        ctx.fillStyle = isMe ? "#2563eb" : "#dc2626";
        ctx.fillRect(pos.x - 8, pos.y - 8, 16, 16);
        ctx.fillStyle = "#000";
        ctx.font = "11px monospace";
        ctx.fillText(serverPlayers[id].name, pos.x - 8, pos.y - 12);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(sendTimer);
      room?.leave();
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  return (
    <main>
      <h1>A1 — movement sync</h1>
      <p>
        {status} · {count} คนในห้อง · ใช้ WASD / ลูกศรเดิน · เปิดหลาย tab หรือรัน{" "}
        <code>npm run loadtest</code> ที่ server
      </p>
      <canvas ref={canvasRef} width={640} height={480} style={{ border: "1px solid #999" }} />
    </main>
  );
}
