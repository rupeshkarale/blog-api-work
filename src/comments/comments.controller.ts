/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Param,
  Get,
} from '@nestjs/common';
import { AddCommentDto } from './dtos/add-comment.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';
import { Request as ExpressRequest } from 'express';
import { UsersEntity } from 'src/user/entities/user.entity';

@Controller()
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/blog/:blogId/comment')
  addComment(
    @Body() addCommentDto: AddCommentDto,
    @Param('blogId') blogId: number,
    @Request()
    req: ExpressRequest & { user: UsersEntity },
  ) {
    return this.commentService.addComment(addCommentDto, req.user, blogId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/blog/:blogId/comment')
  getCommentsByBlogId(@Param('blogId') blogId: number) {
    return this.commentService.getCommentsByBlogId(blogId)
  }
}
