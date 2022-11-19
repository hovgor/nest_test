import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { UserSignInDto } from './dto/user.signin.dto';
import { UserSignUpDto } from './dto/user.signup.dto';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signUp')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:
      ' Required fields , nicname , email , password , password repetition , password must be at least 8 letters, of which at least one large letter and at least one digit.',
  })
  async signUp(@Body() body: UserSignUpDto, @Res() res: Response) {
    try {
      const newUser = await this.authenticationService.createNewUser(body);
      return res.status(HttpStatus.CREATED).json(newUser);
    } catch (error) {
      throw error;
    }
  }

  @Post('signIn')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'You need an email and password to login.',
  })
  async userSignIn(@Body() body: UserSignInDto, @Res() res: Response) {
    try {
      const signIn = await this.authenticationService.signInUser(body);
      return res.status(HttpStatus.ACCEPTED).json(signIn);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @Delete('logout')
  @ApiResponse({
    status: HttpStatus.RESET_CONTENT,
    description: 'For logout user you need insert token and user id.',
  })
  async logout(@Req() req: any, @Res() res: Response) {
    try {
      await this.authenticationService.logout(req);
      return res.status(HttpStatus.RESET_CONTENT).json();
    } catch (error) {
      throw error;
    }
  }
}
