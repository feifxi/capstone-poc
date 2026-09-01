import { Module } from "@nestjs/common";
import { PrismaModule } from "./common/prisma/prisma.module";
import { HealthModule } from "./health/health.module";
import { EventModule } from "./event/event.module";
import { LivekitModule } from "./livekit/livekit.module";

// 1 module = 1 ขอบเขตความรับผิดชอบ · แบ่งงาน 3 คนตาม module
// เห็นรอยตัดชัด → ถ้าจะแยกเป็น microservice ทีหลังก็ตัดตามเส้นนี้
@Module({
  imports: [PrismaModule, HealthModule, EventModule, LivekitModule],
})
export class AppModule {}
