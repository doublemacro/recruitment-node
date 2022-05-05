import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JWT_SECRET } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpriation: false,
      secretOrKey: JWT_SECRET
    });
  }

  async validate(payload: any): Promise<any> {
    return {
      userId: payload.sub,
      username: payload.username
    }
  }
}