import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY, Role } from "../decorators/roles.decorator";
import type { AuthUser } from "./fake-auth.guard";

// อ่าน @Roles(...) จาก method + class แล้วเทียบกับ req.user.role
// context หัวข้อ 11: Guard = "ที่ทางที่ชัดเจนของ permission" — ไม่กระจายเป็น if
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!required || required.length === 0) return true;

    const { user } = ctx.switchToHttp().getRequest<{ user?: AuthUser }>();
    if (!user || !required.includes(user.role)) {
      throw new ForbiddenException(`ต้องมี role: ${required.join(" | ")}`);
    }
    return true;
  }
}
