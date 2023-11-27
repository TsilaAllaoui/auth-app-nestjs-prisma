import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(newUser: CreateUserDto) {
    try {
      const userExist = await this.prisma.user.findUnique({
        where: {
          email: newUser.email,
        },
      });

      if (userExist) {
        throw new ConflictException(
          `User with email ${newUser.email} already exits.`,
        );
      }

      return await this.prisma.user.create({
        data: {
          name: newUser.name,
          email: newUser.email,
          hashed_password: bcrypt.hashSync(newUser.password, 10),
        },
      });
    } catch (err) {
      console.log(err);
      return new BadRequestException('Error whlie creating new user');
    }
  }

  async getAllUsers() {
    try {
      return await this.prisma.user.findMany();
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Error getting all users');
    }
  }

  async deleteUser(id: string) {
    try {
      return await this.prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Error while deleting user');
    }
  }

  async updateUser(id: string, newUserData: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: newUserData,
      });
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Error while deleting user');
    }
  }

  async getOneUser(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) throw new NotFoundException('No user with id ' + id + 'found');
      return user;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Error while getting user with id: ' + id);
    }
  }

  async getOneUserWithEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user)
        throw new NotFoundException('No user with email ' + email + 'found');
      return user;
    } catch (err) {
      console.log(err);
      throw new BadRequestException(
        'Error while getting user with email: ' + email,
      );
    }
  }
}
