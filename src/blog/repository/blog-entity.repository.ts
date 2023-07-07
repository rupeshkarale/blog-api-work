/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { BlogsEntity } from '../entities/blogs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { UsersEntity } from '../../user/entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class BlogEntityRepository {
  constructor(
    @InjectRepository(BlogsEntity)
    private blogEntityRepository: Repository<BlogsEntity>,
  ) {}

  create(createBlogDto: CreateBlogDto, usersEntity: UsersEntity): BlogsEntity {
    return this.blogEntityRepository.create({
      title: createBlogDto.title,
      content: createBlogDto.content,
      authorName: usersEntity.name,
      createdBy: usersEntity.id,
      createdOn: new Date(),
      updatedBy: usersEntity.id,
      updatedOn: new Date(),
      user: usersEntity,
    });
  }

  save(blogEntity: BlogsEntity): Promise<BlogsEntity> {
    return this.blogEntityRepository.save(blogEntity);
  }

  getById(id: number) {
    return this.blogEntityRepository.findOneBy({ id });
  }

  async getValidatedBlogById(id: number) {
    const blogEntity = await this.getById(id);

    if (!blogEntity) {
      throw new BadRequestException(`blog with id:'${id}' does not found`);
    }
    return blogEntity;
  }

  remove(blogEntity: BlogsEntity) {
    return this.blogEntityRepository.remove(blogEntity);
  }

  getBlogs() {
    return this.blogEntityRepository.find();
  }
}
