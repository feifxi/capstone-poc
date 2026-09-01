# reference/nextjs-starter

โครง `apps/web` ตัวจริงแบบย่อ — เปิดอ่านโครงไฟล์ + คอมเมนต์

```bash
npm install
npm run dev        # http://localhost:3100
```

## โครงไฟล์
| path | คืออะไร |
|---|---|
| `app/(marketing)/page.tsx` | หน้า public — Server Component, SSR, SEO/OG. path = `/` |
| `app/(app)/world/page.tsx` | หน้าหลัง login — client-heavy. path = `/world` |
| `src/game/GameCanvasClient.tsx` | ⭐ client wrapper + `dynamic(ssr:false)` — Phaser component ทุกตัวโหลดผ่าน pattern นี้ |
| `src/game/GameCanvas.tsx` | placeholder ที่ Phaser.Game จะ mount (+ destroy ใน cleanup) |
| `src/lib/api.ts` | fetch wrapper ไป NestJS (ใส่ auth header ที่เดียว) |
| `src/lib/colyseus.ts` | Colyseus client singleton + pattern อ่าน state |
| `src/lib/livekit.ts` | LiveKit connect ด้วย token จาก backend |

## route group `(marketing)` vs `(app)`
วงเล็บ = จัดกลุ่มไฟล์เฉยๆ **ไม่โผล่ใน URL** — ใช้แยก "หน้าที่ต้อง SEO" ออกจาก "หน้าหลัง login"
ทำให้ layout / middleware ต่างกันได้ต่อกลุ่ม

## ทำไม Next ไม่ใช่ Vite (สำหรับตัวแอปนี้)
- หน้า marketing ได้ SSR + OG card ฟรี (ลิงก์เชิญงานแชร์ LINE/FB)
- `fetch(..., { next: { revalidate } })` — cache ที่ Vite ไม่มี
- แต่ Phaser ต้อง `ssr:false` เสมอ = ต้นทุนที่จ่าย (ดู `react-starter` เพื่อเทียบ)
