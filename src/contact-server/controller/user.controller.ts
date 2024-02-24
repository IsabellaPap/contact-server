import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/contact-server/entity/user.entity';
import { UserService } from 'src/contact-server/service/user.service';
import { CreateUserDTO } from '../models/create-user.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Register (create) one User' })
  @ApiCreatedResponse({ type: User })
  createUser(@Body() user: CreateUserDTO) {
    return this.userService.createUser(user);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of all Users' })
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
