import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import type { Request } from "express";
import type { AuthUser } from "./fake-auth.guard";

// multi-tenant: user แตะได้เฉพาะข้อมูลของ org ตัวเอง
// context หัวข้อ 9: "ลืมเช็คที่เดียว = ข้อมูลรั่วข้ามลูกค้า" → รวมไว้ที่ Guard ตัวเดียว
@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest<Request & { user?: AuthUser }>();
    const user = req.user;
    if (!user?.orgId) throw new ForbiddenException("ไม่มี org context");

    // org ที่ request พยายามแตะ (จาก param หรือ body)
    const targetOrg = (req.params as any).orgId ?? (req.body as any)?.orgId;
    if (targetOrg && targetOrg !== user.orgId) {
      throw new ForbiddenException("ข้าม tenant ไม่ได้");
    }
    return true;
  }
}
