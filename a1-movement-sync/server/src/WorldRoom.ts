import { Room, Client } from "colyseus";
import { WorldState, Player } from "./WorldState";

const TICK_HZ = 10; // context หัวข้อ 13: เริ่ม 10Hz ไล่ขึ้น (10–15Hz พอ) — ปรับตรงนี้แล้ววัด

export class WorldRoom extends Room<WorldState> {
  maxClients = 60;

  onCreate() {
    this.setState(new WorldState());

    // 🔑 patchRate = ความถี่ที่ server ส่ง "delta ของ state" ให้ทุก client
    this.setPatchRate(1000 / TICK_HZ);

    // A1: position เป็นแบบ client-authoritative (client บอกมา server เชื่อ)
    //   + ง่าย เขียนไว → เหมาะกับ spike และ 30–80 คน
    //   - โกงได้ (teleport, speed hack) → A1 บันทึกว่า "ถ้าต้อง server-authoritative ต้องเพิ่มอะไร"
    this.onMessage("move", (client, msg: { x: number; y: number; dir: number }) => {
      const p = this.state.players.get(client.sessionId);
      if (!p) return;
      p.x = msg.x;
      p.y = msg.y;
      p.dir = msg.dir;
    });
  }

  onJoin(client: Client, options: { name?: string }) {
    const p = new Player();
    p.id = client.sessionId;
    p.name = options.name || `p-${client.sessionId.slice(0, 4)}`;
    p.x = 200 + Math.random() * 400;
    p.y = 150 + Math.random() * 300;
    this.state.players.set(client.sessionId, p);
    console.log(`+ ${p.name} (${this.state.players.size} คนในห้อง)`);
  }

  onLeave(client: Client) {
    this.state.players.delete(client.sessionId);
    console.log(`- ${client.sessionId} (${this.state.players.size} เหลือ)`);
  }
}
