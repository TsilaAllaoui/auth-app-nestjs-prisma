import { IsEmail, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @ApiProperty()
  name?: string;

  @IsEmail()
  @ApiProperty()
  email?: string;

  @IsString()
  @ApiProperty()
  password?: string;
}
