import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { BlogEntityRepository } from './repository/blog-entity.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsEntity } from './entities/blogs.entity';
import { CommentsModule } from '../comments/comments.module';
import { CommentsEntity } from '../comments/entities/comments.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogsEntity, CommentsEntity]),
    CommentsModule,
  ],
  providers: [BlogService, BlogEntityRepository],
  controllers: [BlogController],
  exports: [BlogService],
})
export class BlogModule {}
