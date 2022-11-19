import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get('get-me')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Select token and press button.',
  })
  async getMe(@Res() res: Response, @Req() req: any) {
    try {
      const getMe = await this.usersService.getMy(req);
      return res.status(HttpStatus.ACCEPTED).json(getMe);
    } catch (error) {
      throw error;
    }
  }
}
