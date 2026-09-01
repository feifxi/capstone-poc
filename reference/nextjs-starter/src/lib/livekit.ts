"use client";

import { Room, RoomEvent, Track } from "livekit-client";

// LiveKit helper — connect ด้วย token ที่ได้จาก NestJS (ห้าม generate ที่ client)
// ใช้คู่กับ <RoomAudioRenderer/> จาก @livekit/components-react (ดู spike a0)

const URL = process.env.NEXT_PUBLIC_LIVEKIT_URL ?? "";

export async function connectMedia(token: string): Promise<Room> {
  const room = new Room({ adaptiveStream: true, dynacast: true });

  room.on(RoomEvent.TrackSubscribed, (track, _pub, participant) => {
    if (track.kind === Track.Kind.Audio) {
      // attach เข้า DOM ถึงจะได้ยิน (components-react ทำให้อัตโนมัติ)
      const el = track.attach();
      el.dataset.identity = participant.identity;
      document.body.appendChild(el);
    }
  });

  await room.connect(URL, token);
  await room.localParticipant.setMicrophoneEnabled(true);
  return room;
}

// A2 (proximity) = แค่เปลี่ยน subscription list ตามระยะห่าง avatar — ทำทีหลัง
