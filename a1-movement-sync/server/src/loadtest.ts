// A1 load test — จำลอง 30 bot เดินสุ่ม แล้ววัดว่า server ยังไหวไหม
// รัน server ไว้ก่อน (npm run dev) แล้วอีก terminal: npm run loadtest
import { Client } from "colyseus.js";

const N = Number(process.env.N || 30);
const URL = process.env.URL || "ws://localhost:2567";
const SEND_HZ = 10;

async function spawnBot(i: number) {
  const client = new Client(URL);
  const room = await client.joinOrCreate("world", { name: `bot-${i}` });

  let x = Math.random() * 600;
  let y = Math.random() * 400;

  setInterval(() => {
    x += (Math.random() - 0.5) * 20;
    y += (Math.random() - 0.5) * 20;
    room.send("move", { x, y, dir: Math.random() * 360 });
  }, 1000 / SEND_HZ);

  return room;
}

(async () => {
  console.log(`spawn ${N} bots -> ${URL}`);
  for (let i = 0; i < N; i++) {
    await spawnBot(i);
    await new Promise((r) => setTimeout(r, 100)); // ทยอยเข้า ไม่ถล่มพร้อมกัน
  }
  console.log("bots พร้อม — ดู CPU/RAM ของ server + latency ในหน้า web client");
})();
