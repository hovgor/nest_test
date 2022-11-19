import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseConfigService } from './config/config.service.database';
import { DatabaseModule } from './database/database.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [DatabaseModule, ConfigModule, AuthenticationModule, UsersModule],
  providers: [DatabaseConfigService],
})
export class AppModule {}
