/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Length,
  IsOptional,
} from 'class-validator';

export class UpdateBlogDto {
  @ApiProperty({
    example: 'updated Blog Title',
    description: 'The updated title of the blog',
  })
  @IsString()
  @Length(1, 100)
  @IsOptional()
  title: string;

  @ApiProperty({
    example: 'updated Blog Content',
    description: 'The updated content of the blog',
  })
  @IsString()
  @Length(1, 255)
  @IsOptional()
  content: string;
}
