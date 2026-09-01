import { AccessToken } from "livekit-server-sdk";
import { NextRequest, NextResponse } from "next/server";

// 🔒 บทเรียนหลักของ A0: token ต้องออกจาก "server" เท่านั้น
// ถ้า client generate เองได้ ใครก็ปลอม identity/grant เป็น speaker ได้
// ใน product จริง โค้ดนี้ย้ายไป NestJS: POST /livekit/token + Guard (เช็ค role, เจ้าของ event, quota)

export async function GET(req: NextRequest) {
  const room = req.nextUrl.searchParams.get("room") ?? "lobby";
  const name = req.nextUrl.searchParams.get("name") ?? `guest-${Math.random().toString(36).slice(2, 7)}`;

  const key = process.env.LIVEKIT_API_KEY;
  const secret = process.env.LIVEKIT_API_SECRET;
  if (!key || !secret) {
    return NextResponse.json({ error: "ยังไม่ได้ตั้ง .env.local" }, { status: 500 });
  }

  const at = new AccessToken(key, secret, { identity: name, ttl: "1h" });
  at.addGrant({
    roomJoin: true,
    room,
    canPublish: true, // A0: ทุกคน publish ได้ — A2+ จะแยกตาม role (speaker เท่านั้นที่ canPublish)
    canSubscribe: true,
  });

  return NextResponse.json({ token: await at.toJwt() });
}
