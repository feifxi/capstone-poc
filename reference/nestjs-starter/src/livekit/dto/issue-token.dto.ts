import { IsString, Length } from "class-validator";

export class IssueTokenDto {
  @IsString()
  @Length(1, 64)
  eventId!: string;

  @IsString()
  @Length(1, 40)
  displayName!: string;
}
