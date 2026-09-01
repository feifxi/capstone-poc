# poc-connecta

โปรเจกต์ **POC / spike** ของ Connecta

## `*/` spike — โค้ดที่ต้องทิ้ง (กฎ spike ข้อ 1)
ตอบคำถามความเป็นไปได้ · timebox · ห้ามแต่ง UI · ห้ามเอาไปต่อยอด

| โฟลเดอร์ | spike | คำถามหลัก | timebox |
|---|---|---|---|
| `a0-livekit-audio` | A0 | 2 client ต่อ LiveKit แล้วได้ยินเสียงกันไหม | 4 วัน |
| `a1-movement-sync` | A1 | sync ตำแหน่ง 30 client ด้วย Colyseus ลื่นไหม | 5 วัน |
| `b1-phaser-tilemap` | B1 | โหลด Tiled map + เดินชนกำแพงใน Phaser | 4 วัน |

บันทึกผล → `docs/spikes/<code>.md` (เทมเพลต `_template.md`)

## `reference/` — starter ไว้ให้ทีมดู code เปรียบเทียบ (ไม่ใช่ spike)
| โฟลเดอร์ | คืออะไร |
|---|---|
| `reference/nextjs-starter` | โครง `apps/web` ตัวจริงแบบย่อ |
| `reference/react-starter` | React + Vite เปล่า — ไว้เทียบกับ Next |
| `reference/nestjs-starter` | โครง `api` — Guard / DTO / test — C1/C2 ต่อยอดจากนี่ |

## แบ่งงาน
- A0, A1 → Chanom (Track A) · B1 → สมาชิก 3 (Track B) · C0 ข้ามไปก่อน (ทำ localhost)

## หมายเหตุ
แต่ละโฟลเดอร์ standalone — `cd` เข้าไป `npm install` แยกทีละอัน · ทุกอัน `npm run build` ผ่านแล้ว
