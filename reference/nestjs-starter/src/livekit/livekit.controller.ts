import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { LivekitService } from "./livekit.service";
import { IssueTokenDto } from "./dto/issue-token.dto";
import { FakeAuthGuard, AuthUser } from "../common/guards/fake-auth.guard";

@Controller("livekit")
export class LivekitController {
  constructor(private livekit: LivekitService) {}

  // POST /livekit/token
  //   curl -XPOST localhost:3000/livekit/token -H 'content-type: application/json' \
  //     -H 'x-user-id: u1' -H 'x-user-role: speaker' \
  //     -d '{"eventId":"e1","displayName":"Chanom"}'
  @Post("token")
  @UseGuards(FakeAuthGuard)
  issue(@Req() req: Request & { user: AuthUser }, @Body() dto: IssueTokenDto) {
    return this.livekit.issue({
      userId: req.user.id,
      role: req.user.role,
      eventId: dto.eventId,
      displayName: dto.displayName,
    });
  }
}
