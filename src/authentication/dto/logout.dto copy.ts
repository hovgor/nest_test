import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class LogoutDto {
  @ApiProperty()
  @IsNumber()
  userId: number;
}
