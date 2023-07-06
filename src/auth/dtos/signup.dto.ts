/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    description: 'enter name',
    example: 'john doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'enter email',
    example: 'john@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'enter password',
    example: 'john123456',
  })
  @IsString()
  @Length(6, 10)
  password: string;
}
