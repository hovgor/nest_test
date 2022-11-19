import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { Repository } from 'typeorm';
import { UsersEntityBase } from './repository/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntityBase)
    private usersRepository: Repository<UsersEntityBase>,
    @Inject(forwardRef(() => AuthenticationService))
    private readonly authenticationService: AuthenticationService,
  ) {}

  async getMy(token: string) {
    try {
      const user: UsersEntityBase =
        await this.authenticationService.verifyToken(token);
      if (!user) {
        throw new UnauthorizedException('user is not authorizate!!!');
      }
      return {
        data: { name: user.nicname, phone: user.phone, email: user.email },
      };
    } catch (error) {
      Logger.log('error get mi function');
      throw error;
    }
  }
}
