// Packages
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// Providers
import { JWTConfigService } from 'src/config/config.jwt.service';
import { AuthenticationService } from './authentication.service';
import { jwtConstants } from './constants/jwt.constants';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useExisting: JWTConfigService,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 30 },
    }),
  ],
  exports: [JwtModule, AuthenticationService],
})
export class JWTModule {}
