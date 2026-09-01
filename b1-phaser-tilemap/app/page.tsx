import GameClient from "@/src/GameClient";

// page = Server Component ปกติ · Phaser ถูกกันไว้ใต้ GameClient ("use client" + dynamic ssr:false)
export default function Page() {
  return (
    <main>
      <h1>B1 — Phaser + Tiled + collision</h1>
      <p>
        map มาจาก <code>public/map.json</code> (Tiled JSON format) · tileset generate ในโค้ด
      </p>
      <GameClient />
    </main>
  );
}
