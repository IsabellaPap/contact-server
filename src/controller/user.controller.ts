import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserDTO } from 'src/models/user.dto';
import { UserService } from 'src/service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Register (create) one User' })
  createUser(@Body() userDto: UserDTO) {
    return this.userService.createUser(userDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of all Users' })
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
