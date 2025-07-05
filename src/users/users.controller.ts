import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findOneByUsername(createUserDto.username);
    if (existingUser) {
    throw new BadRequestException('Username already taken');
    }

    const user = await this.usersService.create(createUserDto.username, createUserDto.password);
    // No devuelvas la contraseña
    const { password, ...result } = user;
    return result;
  }
}
