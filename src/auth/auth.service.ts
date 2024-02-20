import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../contact-server/entity/user.entity';
import { JwtPayload } from './jwt-payload.dto';
import { UserService } from 'src/contact-server/service/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    if (!username) {
      console.log(
        'AuthService.validateUser returned null because of missing username',
      );
      return null;
    }
    const user = await this.userService.findUserByUsernameAndPassword(
      username,
      password,
    );

    const jwt: JwtPayload = {
      username: user.name,
      token: '',
      lastAuthTimestamp: new Date(),
      organization: user.organization,
    };
    return jwt;
  }

  async generateJwtToken(user: User): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { credential, ...userData } = user;
    return this.jwtService.sign(userData);
  }
}
