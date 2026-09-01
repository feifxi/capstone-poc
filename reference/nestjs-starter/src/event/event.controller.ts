import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { FakeAuthGuard, AuthUser } from "../common/guards/fake-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { TenantGuard } from "../common/guards/tenant.guard";
import { Roles } from "../common/decorators/roles.decorator";

@Controller("events")
export class EventController {
  constructor(private events: EventService) {}

  // PUBLIC — ไม่มี guard
  @Get("public")
  listPublic() {
    return this.events.listPublic();
  }

  // ต้อง login (FakeAuth) + role organizer (RolesGuard)
  // ลำดับ guard: FakeAuth เติม req.user ก่อน → Roles/Tenant ถึงอ่านได้
  @Post()
  @UseGuards(FakeAuthGuard, RolesGuard, TenantGuard)
  @Roles("organizer")
  create(@Req() req: Request & { user: AuthUser }, @Body() dto: CreateEventDto) {
    return this.events.create(req.user.orgId, dto);
  }

  @Get()
  @UseGuards(FakeAuthGuard)
  listMine(@Req() req: Request & { user: AuthUser }) {
    return this.events.listForOrg(req.user.orgId);
  }

  @Get(":id")
  @UseGuards(FakeAuthGuard)
  getOne(@Req() req: Request & { user: AuthUser }, @Param("id") id: string) {
    return this.events.getForOrg(req.user.orgId, id);
  }
}
