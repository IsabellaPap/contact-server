import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalGuard } from 'src/auth/guard/local.guard';
import { Request } from 'express';

@ApiTags('Organization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  @ApiOperation({ summary: 'User login.' })
  login(@Req() req: Request) {
    return req.user;
  }
}
