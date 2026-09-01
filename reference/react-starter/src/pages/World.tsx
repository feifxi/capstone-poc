import { useSearchParams } from "react-router-dom";

// ข้อดีของ Vite ตรงนี้: Phaser mount ได้ตรงๆ ไม่ต้อง dynamic({ssr:false})
// เพราะไม่มี server render ตั้งแต่แรก — โค้ด client ล้วน
export function World() {
  const [params] = useSearchParams();
  return (
    <main>
      <h1>โลก 2D (event: {params.get("event") ?? "—"})</h1>
      <p>Phaser.Game mount ที่นี่ได้เลย — ไม่มีปัญหา SSR ให้ต้องกัน</p>
      <div style={{ width: 640, height: 480, border: "1px solid #999" }} />
    </main>
  );
}
