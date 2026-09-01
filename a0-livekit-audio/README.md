# A0 — LiveKit hello world

**คำถามที่ต้องตอบ (timebox 4 วัน):**
- 2 client ต่อ LiveKit SFU แล้วได้ยินเสียงกันจริงไหม
- model ของ LiveKit: Room / Participant / Track / Publication ต่างกันยังไง
- token grant มีอะไรบ้าง (`roomJoin`, `canPublish`, `canSubscribe`, `room`)
- event ที่ต้องดัก: `ParticipantConnected/Disconnected`, `TrackSubscribed`, `ActiveSpeakersChanged`

> A0 = **เสียงล้วน** ยังไม่ผูกตำแหน่ง ยังไม่มี proximity (นั่นคือ A2)

## รัน
```bash
npm install
cp .env.example .env.local     # ใส่ค่าจาก LiveKit Cloud (ฟรี ไม่ต้องบัตร)
npm run dev                    # http://localhost:4000
```
เปิด 2 tab (หรือ 2 เครื่อง) ใส่ชื่อคนละชื่อ → Join → พูด

## โครงโค้ด (เอาไว้ให้ทีมดู pattern)
| ไฟล์ | สอนอะไร |
|---|---|
| `app/api/token/route.ts` | 🔒 token ออกจาก server เท่านั้น — ของจริงย้ายไป NestJS + Guard |
| `app/page.tsx` | ฝั่ง client ใช้ `@livekit/components-react`: `<LiveKitRoom>` + `<RoomAudioRenderer>` + `useParticipants()` |

`<RoomAudioRenderer/>` คือตัวที่ทำให้ได้ยินเสียง (มันสร้าง `<audio>` ให้ทุก remote track อัตโนมัติ)

## บันทึกผล → `../docs/spikes/a0.md`
วัด: เข้าห้องกี่ ms, เสียง delay รู้สึกได้ไหม, ใช้ candidate แบบไหน (webrtc-internals),
เปิดพร้อมกัน 5-6 คนแล้วเป็นยังไง
