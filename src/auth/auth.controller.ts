import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { LocalGuard } from 'src/auth/guard/local.guard';
import { Request } from 'express';

class AuthUserCredentials {
  @ApiProperty({
    description: 'Username. Required.',
  })
  username: string = '';
  @ApiProperty({ description: 'Clear text password.' })
  password: string = '';
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('login')
  @UseGuards(LocalGuard)
  @ApiOperation({ summary: 'User login.' })
  @ApiBody({ type: AuthUserCredentials })
  login(@Req() req: Request) {
    return req.user;
  }
}
