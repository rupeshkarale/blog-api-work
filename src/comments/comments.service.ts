/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { AddCommentDto } from './dtos/add-comment.dto';
import { UsersEntity } from '../user/entities/user.entity';
import { CommentsEntityRepository } from './repository/comments-entity.repository';
import { BlogService } from './../blog/blog.service';
import { forwardRef } from '@nestjs/common';

@Injectable()
export class CommentsService {
  constructor(
    private commentsEntityRepository: CommentsEntityRepository,

    @Inject(forwardRef(() => BlogService))
    private blogService: BlogService,
  ) {}

  async addComment(
    addCommentDto: AddCommentDto,
    userEntity: UsersEntity,
    blogId: number,
  ) {
    // Retrieve the blog entity by its ID
    const blogEntity = await this.blogService.getBlogById(blogId);
    // Create a new comment entity with the provided data
    const commentEntity = this.commentsEntityRepository.create(
      addCommentDto,
      userEntity,
      blogId,
      blogEntity,
    );

    // Save the comment entity to the database and return the saved comment (excluding the 'user' property)
    return this.commentsEntityRepository
      .save(commentEntity)
      .then(({ user, ...savedBlogEntity }) => savedBlogEntity);
  }

  getCommentsByBlogId(blogId: number) {
    return this.commentsEntityRepository.getByBlogId(blogId);
  }

  deleteById(blogId: number) {
    return this.commentsEntityRepository.deleteById(blogId);
  }
}
