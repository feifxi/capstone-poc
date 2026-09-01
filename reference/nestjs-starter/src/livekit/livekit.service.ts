import { Injectable } from "@nestjs/common";
import { AccessToken } from "livekit-server-sdk";
import type { Role } from "../common/decorators/roles.decorator";

// 🔒 จุดเดียวในระบบที่ออก LiveKit token — context หัวข้อ 11:
// "token คือประตูเดียวที่คุมสิทธิ์ได้จริง" + เป็นจุดบังคับ quota
@Injectable()
export class LivekitService {
  private key = process.env.LIVEKIT_API_KEY ?? "devkey";
  private secret = process.env.LIVEKIT_API_SECRET ?? "secretsecretsecretsecretsecret32";

  async issue(params: { userId: string; role: Role; eventId: string; displayName: string }) {
    const { userId, role, eventId, displayName } = params;

    // ⭐ กติกา: speaker/organizer เท่านั้นที่ publish เสียงได้
    // participant ทั่วไป subscribe อย่างเดียว (โหมดผู้ชม / audience)
    const canPublish = role === "speaker" || role === "organizer";

    const at = new AccessToken(this.key, this.secret, {
      identity: userId,
      name: displayName,
      ttl: "2h",
    });
    at.addGrant({
      roomJoin: true,
      room: `event-${eventId}`, // room ผูกกับ event → กันข้ามงาน
      canPublish,
      canSubscribe: true,
      canPublishData: true,
    });

    return { token: await at.toJwt(), canPublish };
  }
}
