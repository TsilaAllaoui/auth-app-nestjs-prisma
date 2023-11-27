import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
  })
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Post()
  @ApiOperation({
    summary: 'Create new user',
  })
  async createUser(@Body() newUser: CreateUserDto) {
    return await this.userService.createUser(newUser);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user',
  })
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update user',
  })
  async updateUser(@Param('id') id: string, @Body() newUser: CreateUserDto) {
    return await this.userService.updateUser(id, newUser);
  }
}
