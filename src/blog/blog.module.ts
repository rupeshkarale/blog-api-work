import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { BlogEntityRepository } from './repository/blog-entity.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsEntity } from './entities/blogs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogsEntity])],
  providers: [BlogService, BlogEntityRepository],
  controllers: [BlogController],
  exports: [BlogService],
})
export class BlogModule {}
