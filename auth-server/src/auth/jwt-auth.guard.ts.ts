import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // Get the JWT secret from config
    });
  }

  async validate(payload: any) {
    // You can add custom validation logic here
    // For example, you can fetch the user from the database using the payload.sub (user ID)
    return { userId: payload.sub, email: payload.email, name: payload.name };
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}