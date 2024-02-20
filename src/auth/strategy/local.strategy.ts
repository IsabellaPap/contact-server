import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../jwt-payload.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
      session: false,
    });
  }

  async validate(
    req: any,
    username: string,
    password: string,
  ): Promise<JwtPayload> {
    console.log(
      'LocalStrategy.validate ',
      req.body.profile,
      username,
      password,
    );
    const auth = await this.authService.validateUser(username, password);
    if (!auth) {
      throw new UnauthorizedException();
    }
    return auth;
  }
}
