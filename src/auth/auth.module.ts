import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import {JWT_SECRET} from 'src/auth/constants'
import { JwtStrategy } from './jwt.strategy.ts';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: JWT_SECRET,
    signOptions: {expiresIn: '604800s'}
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
