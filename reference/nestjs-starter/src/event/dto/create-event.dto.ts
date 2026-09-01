import { IsBoolean, IsOptional, IsString, Length } from "class-validator";

// DTO = สัญญาว่า endpoint นี้รับอะไร · ValidationPipe บังคับใช้ให้อัตโนมัติ
export class CreateEventDto {
  @IsString()
  @Length(3, 80)
  name!: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}
