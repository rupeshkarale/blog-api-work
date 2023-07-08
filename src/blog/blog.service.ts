/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogEntityRepository } from './repository/blog-entity.repository';
import { UsersEntity } from '../user/entities/user.entity';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CommentsService } from '../comments/comments.service';

@Injectable()
export class BlogService {
  constructor(
    private blogsEntityRepository: BlogEntityRepository,

    private commentService: CommentsService,
  ) {}

  createBlog(createBlogDto: CreateBlogDto, userEntity: UsersEntity) {
    const blogEntity = this.blogsEntityRepository.create(
      createBlogDto,
      userEntity,
    );

    return this.blogsEntityRepository
      .save(blogEntity)
      .then(({ user, ...savedBlogEntity }) => savedBlogEntity);
  }

  getBlogById(blogId: number) {
    return this.blogsEntityRepository.getValidatedBlogById(blogId);
  }

  async updateBlogById(
    blogId: number,
    updateBlogDto: UpdateBlogDto,
    userEntity: UsersEntity,
  ) {
    const blogEntity = await this.blogsEntityRepository.getValidatedBlogById(
      blogId,
    );

    blogEntity.updatedBy = userEntity.id;
    blogEntity.updatedOn = new Date();

    Object.assign(blogEntity, updateBlogDto);

    return this.blogsEntityRepository.save(blogEntity);
  }

  async deleteBlogById(blogId: number) {
    const blogEntity = await this.blogsEntityRepository.getValidatedBlogById(
      blogId,
    );
    await this.commentService.deleteById(blogId);
    return this.blogsEntityRepository.remove(blogEntity);
  }

  async getBlogs() {
    return this.blogsEntityRepository.getBlogs();
  }
}
