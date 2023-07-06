/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddCommentDto {
  @ApiProperty({
    example: 'comment on blog',
  })
  @IsNotEmpty()
  @IsString()
  comment: string;
}
