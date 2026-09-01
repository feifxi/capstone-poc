import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { CreateEventDto } from "./dto/create-event.dto";

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  create(orgId: string, dto: CreateEventDto) {
    return this.prisma.event.create({
      orgId,
      name: dto.name,
      isPublic: dto.isPublic ?? false,
    });
  }

  listPublic() {
    return this.prisma.event.findMany({ isPublic: true });
  }

  // ทุก read กรองด้วย orgId — ไม่มี query ไหนที่ไม่มี tenant filter
  listForOrg(orgId: string) {
    return this.prisma.event.findMany({ orgId });
  }

  async getForOrg(orgId: string, id: string) {
    const ev = await this.prisma.event.findFirst({ id, orgId });
    if (!ev) throw new NotFoundException("event ไม่พบ (หรือไม่ใช่ของ org นี้)");
    return ev;
  }
}
