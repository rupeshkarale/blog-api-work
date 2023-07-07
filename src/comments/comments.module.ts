/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsEntityRepository } from './repository/comments-entity.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsEntity } from './entities/comments.entity';
import { BlogModule } from '../blog/blog.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsEntity]), BlogModule],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsEntityRepository],
})
export class CommentsModule {}
