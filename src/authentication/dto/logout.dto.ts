import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class LogoutDto {
  @ApiProperty()
  @IsNumber()
  userId: number;
}
