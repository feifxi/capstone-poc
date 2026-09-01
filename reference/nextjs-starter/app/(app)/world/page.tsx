import GameCanvasClient from "@/src/game/GameCanvasClient";

// ── หน้า APP (หลัง login / guest token) ──────────────────────
// path = "/world" (route group (app) ไม่โผล่ใน URL)
// หน้านี้ไม่ต้องการ SEO → ปล่อยให้เป็น client-heavy ได้เต็มที่

export default async function WorldPage({
  searchParams,
}: {
  searchParams: Promise<{ event?: string }>; // Next 15: เป็น Promise แล้ว
}) {
  const { event } = await searchParams;
  return (
    <main>
      <h1>โลก 2D (event: {event ?? "—"})</h1>
      <p>
        ของจริง: หน้านี้จะ (1) ขอ guest token จาก NestJS (2) join Colyseus room (3) mount Phaser
        <br />ดูตัวอย่างครบๆ ที่ spike <code>a1-movement-sync</code> และ <code>b1-phaser-tilemap</code>
      </p>
      <GameCanvasClient />
    </main>
  );
}
