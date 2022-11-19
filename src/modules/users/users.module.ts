import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntityBase } from './repository/users.entity';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntityBase]),
    forwardRef(() => AuthenticationModule),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
