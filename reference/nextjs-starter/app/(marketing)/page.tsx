import type { Metadata } from "next";

// ── หน้า PUBLIC ──────────────────────────────────────────────
// อยู่ใน route group (marketing) → เป็น Server Component ปกติ
// ได้ SSR + SEO + OG card ฟรี (สำคัญตอนแชร์ลิงก์เชิญงานใน LINE/FB)
// route group ใช้แค่จัดกลุ่ม ไม่โผล่ใน URL → หน้านี้ path = "/"

export const metadata: Metadata = {
  title: "Connecta — จัดงานอีเวนต์ในโลก 2D",
  description: "ผู้เข้าร่วมเดินคุยกันได้เหมือนอยู่ในงานจริง",
  openGraph: {
    title: "Connecta",
    description: "พื้นที่จัดงานเสมือน 2 มิติ",
    images: ["/og.png"],
  },
};

// ตัวอย่างเรียก backend จาก Server Component (ทำงานบน server, ไม่โผล่ที่ browser)
async function getPublicEvents() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/public`, {
      next: { revalidate: 60 }, // cache 60 วิ — จุดแข็งของ Next ที่ Vite ไม่มี
    });
    if (!res.ok) return [];
    return (await res.json()) as { id: string; name: string }[];
  } catch {
    return [];
  }
}

export default async function LandingPage() {
  const events = await getPublicEvents();
  return (
    <main>
      <h1>Connecta</h1>
      <p>หน้านี้เป็น Server Component — SSR + SEO + OG. ลอง view-source จะเห็น HTML เต็ม</p>
      <h2>งานที่กำลังจะมาถึง ({events.length})</h2>
      <ul>
        {events.map((e) => (
          <li key={e.id}>
            <a href={`/world?event=${e.id}`}>{e.name}</a>
          </li>
        ))}
        {events.length === 0 && <li style={{ color: "#888" }}>(ยังไม่มี — หรือ API ไม่ได้รัน)</li>}
      </ul>
    </main>
  );
}
