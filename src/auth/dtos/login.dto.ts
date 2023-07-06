/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'enter email',
    example: 'john@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'enter password',
    example: 'john123456',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;
}
