# reference/react-starter

React + Vite เปล่าๆ — **ไว้เทียบกับ nextjs-starter เฉยๆ** ไม่ได้จะใช้จริง

```bash
npm install
npm run dev        # http://localhost:3200
```

## ต่างจาก Next ตรงไหน (ดูโค้ดคู่กัน)

| | react-starter (Vite) | nextjs-starter |
|---|---|---|
| routing | เขียนเอง (`react-router` ใน `main.tsx`) | โครงโฟลเดอร์ `app/` |
| fetch ข้อมูล | client-side `useEffect` เท่านั้น → มี loading เสมอ | Server Component ได้ (ไม่มี loading, มี HTML) |
| SEO / OG | ❌ view-source เห็น div ว่าง | ✅ SSR |
| cache | เขียนเอง | `fetch(..., { next: { revalidate }})` |
| Phaser | mount ตรงๆ ได้เลย | ต้อง `dynamic({ ssr:false })` |
| config | `vite.config.ts` ไฟล์เดียว | `next.config` + convention หลายที่ |
| HMR | เร็วกว่านิดหน่อยเวลาโปรเจกต์ใหญ่ | เร็วพอ |
| API endpoint | ❌ ต้องมี backend แยก | route handler ในตัว |

## สรุป
สำหรับ Connecta ที่หน้า marketing ต้อง SEO และมีทั้ง public + หลัง-login → **Next คุ้มกว่า**
Vite จะดีถ้าทั้งแอปอยู่หลัง login หมดและไม่ต้อง SEO เลย
