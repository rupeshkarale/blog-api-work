/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../../user/entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentsEntity } from '../entities/comments.entity';
import { AddCommentDto } from '../dtos/add-comment.dto';
import { BlogsEntity } from '../../blog/entities/blogs.entity';

@Injectable()
export class CommentsEntityRepository {
  constructor(
    @InjectRepository(CommentsEntity)
    private commentsEntityRepository: Repository<CommentsEntity>,
  ) {}

  create(
    addCommentDto: AddCommentDto,
    userEntity: UsersEntity,
    blogId: number,
    blogEntity: BlogsEntity,
  ): CommentsEntity {
    return this.commentsEntityRepository.create({
      comment: addCommentDto.comment,
      user: userEntity,
      userName: userEntity.name,
      blogId: blogId,
      createdBy: userEntity.id,
      createdOn: new Date(),
      updatedBy: userEntity.id,
      updatedOn: new Date(),
    });
  }

  save(commentsEntity: CommentsEntity): Promise<CommentsEntity> {
    return this.commentsEntityRepository.save(commentsEntity);
  }

  //   getById(id: number) {
  //     return this.blogEntityRepository.findOneBy({ id });
  //   }

  //   async getValidatedBlogById(id: number) {
  //     const blogEntity = await this.getById(id);

  //     if (!blogEntity) {
  //       throw new BadRequestException(`blog with id:'${id}' does not found`);
  //     }
  //     return blogEntity;
  //   }

  //   remove(blogEntity: BlogsEntity) {
  //     return this.blogEntityRepository.remove(blogEntity);
  //   }

  getByBlogId(blogId: number) {
    return this.commentsEntityRepository.findBy({ blogId: blogId });
  }

  deleteById(blogId: number) {
    return this.commentsEntityRepository.delete({ blogId: blogId });
  }
}
