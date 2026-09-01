"use client";

import { Client, Room } from "colyseus.js";

// Colyseus client — singleton ต่อ tab (อย่าสร้างใหม่ทุก render)
// ใช้ที่ไหน: หน้า /world ตอน mount → joinWorld() → เก็บ room ไว้ใน state/context

const URL = process.env.NEXT_PUBLIC_REALTIME_URL ?? "ws://localhost:2567";

let client: Client | null = null;
function getClient() {
  return (client ??= new Client(URL));
}

export async function joinWorld(eventId: string, name: string): Promise<Room> {
  // options ตัวนี้ถูกส่งไปที่ WorldRoom.onJoin ฝั่ง server
  return getClient().joinOrCreate("world", { eventId, name });
}

// pattern การอ่าน state (colyseus.js 0.15)
export function bindPlayers(
  room: Room,
  onAdd: (id: string, p: any) => void,
  onRemove: (id: string) => void,
) {
  const players = (room.state as any).players;
  players.onAdd((p: any, id: string) => {
    onAdd(id, p);
    p.onChange(() => onAdd(id, p)); // re-emit เมื่อค่าเปลี่ยน
  });
  players.onRemove((_: any, id: string) => onRemove(id));
}
