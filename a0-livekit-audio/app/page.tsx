"use client";

import {
  LiveKitRoom,
  RoomAudioRenderer,
  useParticipants,
  useLocalParticipant,
  TrackToggle,
  useConnectionState,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useState } from "react";

const SERVER_URL = process.env.NEXT_PUBLIC_LIVEKIT_URL!;

export default function Page() {
  const [name, setName] = useState("user-" + Math.floor(Math.random() * 1000));
  const [room, setRoom] = useState("lobby");
  const [token, setToken] = useState<string>();

  async function join() {
    const res = await fetch(`/api/token?room=${room}&name=${name}`).then((r) => r.json());
    if (res.error) return alert(res.error);
    setToken(res.token);
  }

  if (!token) {
    return (
      <main style={{ maxWidth: 480 }}>
        <h1>A0 — LiveKit hello world</h1>
        <p>เปิดหน้านี้ 2 tab / 2 เครื่อง ใส่ชื่อคนละชื่อ กด Join แล้วลองพูด</p>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="ชื่อ" />{" "}
        <input value={room} onChange={(e) => setRoom(e.target.value)} placeholder="room" />{" "}
        <button onClick={join}>Join</button>
      </main>
    );
  }

  return (
    <LiveKitRoom
      serverUrl={SERVER_URL}
      token={token}
      connect
      audio // publish ไมค์ทันทีที่เข้าห้อง
      video={false}
      onDisconnected={() => setToken(undefined)}
    >
      <Stage />
      {/* ตัวนี้แหละที่ทำให้ "ได้ยินเสียง" — render <audio> ของทุก remote track ให้อัตโนมัติ */}
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
}

function Stage() {
  const state = useConnectionState();
  const participants = useParticipants(); // รวม local + remote, re-render เมื่อมีคนเข้า/ออก/พูด
  const { localParticipant } = useLocalParticipant();

  return (
    <main style={{ maxWidth: 480 }}>
      <h1>ห้อง (สถานะ: {state})</h1>

      <TrackToggle source={Track.Source.Microphone}>สลับไมค์</TrackToggle>

      <ul>
        {participants.map((p) => (
          <li
            key={p.identity}
            style={{
              padding: "6px 10px",
              margin: "4px 0",
              border: "1px solid",
              borderColor: p.isSpeaking ? "#16a34a" : "#ccc",
              background: p.isSpeaking ? "#dcfce7" : "transparent",
              borderRadius: 4,
            }}
          >
            {p.identity}
            {p.identity === localParticipant.identity ? " (ฉัน)" : ""} {p.isSpeaking ? "🔊" : ""}
          </li>
        ))}
      </ul>

      <p style={{ fontSize: 13, color: "#666" }}>
        เปิด <code>chrome://webrtc-internals</code> ดู candidate pair ที่ถูกเลือก (host/srflx/relay)
      </p>
    </main>
  );
}
