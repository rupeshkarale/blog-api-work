import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Param,
  Get,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { secretKey } from './../shareble/constant';
import { UsersEntity } from 'src/user/entities/user.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogService } from './blog.service';
import { Request as ExpressRequest } from 'express';
import { UpdateBlogDto } from './dto/update-blog.dto';
@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/blog')
  createBlog(
    @Body() createBlogDto: CreateBlogDto,
    @Request() req: ExpressRequest & { user: UsersEntity },
  ) {
    return this.blogService.createBlog(createBlogDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/blog/:blogId')
  getBlogById(@Param('blogId') blogId: number) {
    return this.blogService.getBlogById(blogId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('/blog/:blogId')
  updateBlogById(
    @Body() updateBlogDto: UpdateBlogDto,
    @Param('blogId') blogId: number,
    @Request() req: ExpressRequest & { user: UsersEntity },
  ) {
    return this.blogService.updateBlogById(blogId, updateBlogDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/blog/:blogId')
  deleteBlogById(@Param('blogId') blogId: number) {
    return this.blogService.deleteBlogById(blogId);
  }
}
