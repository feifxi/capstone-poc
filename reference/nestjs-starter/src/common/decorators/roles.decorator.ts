import { SetMetadata } from "@nestjs/common";

export type Role = "user" | "staff" | "speaker" | "organizer";

// ใช้: @Roles("organizer") บน controller หรือ method
// RolesGuard จะอ่าน metadata ตัวนี้ผ่าน Reflector
export const ROLES_KEY = "roles";
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
