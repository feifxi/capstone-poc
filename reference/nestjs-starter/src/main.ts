import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global ValidationPipe = ทุก endpoint ที่รับ DTO จะถูก validate อัตโนมัติ
  // whitelist: ตัด field ที่ไม่ได้ประกาศใน DTO ทิ้ง (กัน mass-assignment)
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log(`nestjs-starter: http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
