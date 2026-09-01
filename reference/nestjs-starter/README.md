# reference/nestjs-starter

โครง `api` (NestJS) — C1 (auth+roles) และ C2 (queue concurrency) จะต่อยอดจากนี่

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # รัน livekit.service.spec.ts
```

## ลองด้วย curl
```bash
# public — ไม่ต้อง auth
curl localhost:3000/events/public

# สร้าง event ต้องเป็น organizer (RolesGuard) — อันนี้ผ่าน
curl -XPOST localhost:3000/events -H 'content-type: application/json' \
  -H 'x-user-id: u1' -H 'x-user-role: organizer' -H 'x-org-id: org1' \
  -d '{"name":"Tech Meetup","isPublic":true}'

# role user → 403 (RolesGuard บล็อก)
curl -XPOST localhost:3000/events -H 'content-type: application/json' \
  -H 'x-user-role: user' -H 'x-org-id: org1' -d '{"name":"xxx"}'

# name สั้นไป → 400 (ValidationPipe บล็อก)
curl -XPOST localhost:3000/events -H 'content-type: application/json' \
  -H 'x-user-role: organizer' -H 'x-org-id: org1' -d '{"name":"ab"}'

# LiveKit token — speaker ได้ canPublish:true / user ได้ false
curl -XPOST localhost:3000/livekit/token -H 'content-type: application/json' \
  -H 'x-user-id: u1' -H 'x-user-role: speaker' -d '{"eventId":"e1","displayName":"Chanom"}'
```

## โครงไฟล์ — pattern ที่อยากให้ทีมเห็น
| path | สอนอะไร |
|---|---|
| `src/app.module.ts` | 1 module = 1 ขอบเขต · แบ่งงาน 3 คนตาม module |
| `src/main.ts` | global `ValidationPipe` — ทุก DTO ถูก validate อัตโนมัติ |
| `common/decorators/roles.decorator.ts` + `guards/roles.guard.ts` | ⭐ permission อยู่ที่ Guard ที่เดียว ไม่กระจายเป็น `if` |
| `common/guards/tenant.guard.ts` | multi-tenant — กันข้อมูลรั่วข้าม org |
| `common/guards/fake-auth.guard.ts` | STUB ของ JWT AuthGuard (อ่าน header แทน) |
| `common/prisma/prisma.service.ts` | STUB ของ PrismaClient (in-memory) — ทุก entity มี `orgId` |
| `event/` | CRUD เต็มรูป: DTO → Guard → Controller → Service → (Prisma) |
| `livekit/livekit.service.ts` | 🔒 จุดเดียวที่ออก token + บังคับกติกา speaker/audience |
| `livekit/livekit.service.spec.ts` | DI → mock ได้ → เทสได้โดยไม่แตะ LiveKit จริง |

## ทำไม NestJS ไม่ใช่ Express (context หัวข้อ 11)
ทีม 3 คนเขียนพร้อมกัน → ซื้อ "การไม่ต้องถกเถียง" ว่าวางไฟล์ยังไง, validate ที่ไหน, auth check ตรงไหน
แลกกับ boilerplate เยอะ + learning curve DI ~1 สัปดาห์
