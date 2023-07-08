/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AddCommentDto {
  @ApiProperty({
    example: 'comment on blog',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  comment: string;
}
