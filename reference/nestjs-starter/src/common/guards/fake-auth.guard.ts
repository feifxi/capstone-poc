import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import type { Request } from "express";
import type { Role } from "../decorators/roles.decorator";

export type AuthUser = { id: string; role: Role; orgId: string };

// ⚠️ STUB — ของจริงคือ JWT AuthGuard (verify token → decode → req.user)
// ที่นี่อ่านจาก header เพื่อให้ทดสอบด้วย curl ได้ง่าย:
//   curl -H 'x-user-id: u1' -H 'x-user-role: organizer' -H 'x-org-id: org1' ...
@Injectable()
export class FakeAuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest<Request & { user?: AuthUser }>();
    req.user = {
      id: (req.header("x-user-id") as string) || "anon",
      role: ((req.header("x-user-role") as Role) || "user"),
      orgId: (req.header("x-org-id") as string) || "",
    };
    return true; // ไม่ block ใคร — แค่เติม req.user
  }
}
