# reference/ — starter ไว้ให้ทีมดู code เปรียบเทียบ

**ไม่ใช่ spike · ไม่ตอบคำถามความเป็นไปได้ · แค่โครง stack ให้ทีมอ่าน**
ทั้ง 3 อัน standalone รันแยกกัน เปิดอ่านอย่างเดียวก็ได้

| โฟลเดอร์ | คืออะไร | ใช้ตอนไหน |
|---|---|---|
| `nextjs-starter` | โครง `apps/web` ตัวจริงแบบย่อ — route group, client wrapper สำหรับ Phaser, lib/ ที่ทุก feature ใช้ | เขียน frontend จริง |
| `react-starter` | React + Vite เปล่าๆ | **เทียบให้เห็นว่าทำไมเลือก Next** (หรือไม่เลือก) |
| `nestjs-starter` | NestJS: module / controller / service / Guard / DTO / test | C1 (auth+roles), C2 (queue concurrency) ต่อยอดจากนี่ |

## architecture จริง (context หัวข้อ 12) — ไม่ใช่ Next 3 ตัวเหมือน spike
```
Browser ──┬── apps/web      (Next)      หน้าเว็บ + เกม
          ├── api           (NestJS)    event, token, quota, queue
          ├── realtime      (Colyseus)  ตำแหน่ง, presence
          └── livekit                   media (ต่อตรง ไม่ผ่าน proxy)
```
starter พวกนี้คือ "หน้าตาโค้ดของแต่ละกล่อง" ไม่ใช่วิธี deploy
