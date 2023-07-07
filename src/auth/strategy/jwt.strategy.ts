/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { secretKey } from '../../shareble/constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey, // Replace with your own secret key
    });
  }

  async validate(payload: JwtPayload) {
    const userEntity = await this.authService.validateUser(payload);
    if (!userEntity) {
      throw new UnauthorizedException('user not found');
    }
    return userEntity;
  }
}
