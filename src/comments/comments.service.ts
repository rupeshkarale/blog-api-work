/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AddCommentDto } from './dtos/add-comment.dto';
import { UsersEntity } from 'src/user/entities/user.entity';
import { BlogEntityRepository } from 'src/blog/repository/blog-entity.repository';
import { CommentsEntityRepository } from './repository/comments-entity.repository';
import { BlogService } from './../blog/blog.service';

@Injectable()
export class CommentsService {
  constructor(
    private commentsEntityRepository: CommentsEntityRepository,
    private blogService: BlogService,
  ) {}

  async addComment(
    addCommentDto: AddCommentDto,
    userEntity: UsersEntity,
    blogId: number,
  ) {
    // Retrieve the blog entity by its ID
    const blogEntity = await this.blogService.getBlogById(blogId);
console.log(process.env.password);
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
}
