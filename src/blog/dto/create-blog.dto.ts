/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({ example: 'Blog Title', description: 'The title of the blog' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  title: string;

  @ApiProperty({
    example: 'Blog Content',
    description: 'The content of the blog',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
