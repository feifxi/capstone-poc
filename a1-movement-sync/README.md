# A1 — Movement sync (Colyseus)

**คำถามที่ต้องตอบ (timebox 5 วัน):**
- tick rate เท่าไหร่ถึงพอ (เริ่ม 10Hz)
- delta หรือ full state — Colyseus ทำ delta ให้เอง ต้องรู้ว่ามัน sync อะไรบ้าง
- interpolation ต่างจาก snap แค่ไหน (ลองแก้ `0.2` เป็น `1.0` ใน `web/app/page.tsx`)
- ต้องทำ interest management ไหมที่ 30–80 คน (ตอนนี้ยังไม่ทำ — ส่งทุกคนให้ทุกคน)
- ใครเป็นเจ้าของ position — ตอนนี้ client บอก server เชื่อ (ง่าย แต่โกงได้)

> A1 = **state sync ล้วน** ไม่แตะเสียง ไม่แตะ LiveKit เลย

## รัน (2 terminal)
```bash
# terminal 1 — realtime server
cd server && npm install && npm run dev        # ws://localhost:2567

# terminal 2 — web client
cd web && npm install && cp .env.example .env.local && npm run dev   # http://localhost:4100
```
เปิดหลาย tab เดินไปมา · หรือจำลอง 30 คน:
```bash
cd server && npm run loadtest      # N=50 npm run loadtest เพื่อดันเยอะขึ้น
```

## โครงโค้ด (ให้ทีมดู pattern)
| ไฟล์ | สอนอะไร |
|---|---|
| `server/src/WorldState.ts` | `@colyseus/schema` — ประกาศ shape ของ state ที่จะ sync |
| `server/src/WorldRoom.ts` | room lifecycle: `onJoin/onLeave`, `onMessage`, `setPatchRate` |
| `server/src/loadtest.ts` | จำลอง bot ด้วย `colyseus.js` (client SDK ตัวเดียวกับ browser) |
| `web/app/page.tsx` | client: `joinOrCreate`, `state.players.onAdd/onChange`, interpolation, ส่ง input ที่ 10Hz |

## บันทึกผล → `../docs/spikes/a1.md`
วัด: 30 bot + คุณเดินเอง กระตุกไหม · CPU/RAM server · bandwidth ต่อ client ·
ที่กี่คน server เริ่มมีอาการ
