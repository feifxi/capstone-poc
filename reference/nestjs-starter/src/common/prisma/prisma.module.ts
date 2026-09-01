import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

// @Global = ไม่ต้อง import ซ้ำในทุก module ที่ใช้ DB
@Global()
@Module({ providers: [PrismaService], exports: [PrismaService] })
export class PrismaModule {}
