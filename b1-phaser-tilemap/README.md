# B1 — Phaser + Tiled + collision

**คำถามที่ต้องตอบ (timebox 4 วัน):**
- โหลด Tiled map (JSON) เข้า Phaser แล้ว render layer ได้ไหม
- collision จาก layer ทำงานไหม (เดินชนกำแพงไม่ทะลุ)
- camera follow + world bounds
- Phaser อยู่กับ Next ยังไงโดยไม่พัง (ssr:false + destroy ตอน fast-refresh)

> tileset ที่นี่ generate ในโค้ด (สี่เหลี่ยมสี) — การทดสอบ **Tiled + PNG pipeline จริง**
> (คนไม่เขียนโค้ดสร้างแมปได้ใน 2 ชม.) คือ spike B2 แยกต่างหาก

## รัน
```bash
npm install
npm run dev        # http://localhost:4200
```
ลูกศรเดิน · ชนกำแพงเทาไม่ได้ · กล้องตามตัว

## โครงโค้ด (ให้ทีมดู pattern)
| ไฟล์ | สอนอะไร |
|---|---|
| `app/page.tsx` | `dynamic(() => import(...), { ssr:false })` — pattern เดียวที่ต้องจำ |
| `src/Game.tsx` | mount `Phaser.Game` ใน `useEffect` + **destroy ใน cleanup** (กัน leak ตอน HMR) |
| `src/WorldScene.ts` | `load.tilemapTiledJSON`, `createLayer`, `setCollisionByExclusion`, `physics.add.collider` |
| `public/map.json` | Tiled JSON — 2 layer (ground/walls), 25×19, tile 32px |

## จุดที่ต้องจับตา (บันทึกลง `../docs/spikes/b1.md`)
- แก้โค้ด scene แล้ว fast-refresh — มี canvas ซ้อน / FPS ตก / error ไหม (Phaser leak)
- FPS บนเครื่องสเปคต่ำ / มือถือ (→ ต่อยอด B4)
- เปลี่ยน `map.json` ด้วยมือแล้ว reload — layer เพี้ยนไหม
