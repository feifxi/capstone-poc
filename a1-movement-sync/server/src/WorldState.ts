import { Schema, MapSchema, type } from "@colyseus/schema";

// state ที่มีอายุเท่า session — Colyseus จะ sync เฉพาะ "ส่วนที่เปลี่ยน" (delta) ให้เอง
// ของจริง: state แบบนี้จะอยู่ใน realtime service ไม่ใช่ Postgres (context หัวข้อ 11)

export class Player extends Schema {
  @type("string") id = "";
  @type("string") name = "";
  @type("number") x = 0;
  @type("number") y = 0;
  @type("number") dir = 0; // องศา ไว้หันหน้า avatar
}

export class WorldState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
}
