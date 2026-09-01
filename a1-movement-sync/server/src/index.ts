import { Server } from "colyseus";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { createServer } from "http";
import { WorldRoom } from "./WorldRoom";

const PORT = Number(process.env.PORT || 2567);

const httpServer = createServer((req, res) => {
  // health check เฉยๆ ไม่ serve client (client อยู่คนละ process = โฟลเดอร์ web/)
  res.writeHead(200);
  res.end("colyseus a1 ok");
});

const gameServer = new Server({
  transport: new WebSocketTransport({ server: httpServer }),
});

gameServer.define("world", WorldRoom);

httpServer.listen(PORT, () => console.log(`\nA1 realtime: ws://localhost:${PORT}\n`));
