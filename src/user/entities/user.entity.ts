/* eslint-disable prettier/prettier */
import { BlogsEntity } from '../../blog/entities/blogs.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// import { BlogPost } from '../.';
// import { Comment } from './path/to/comment.entity';
import { CommentsEntity } from '../../comments/entities/comments.entity';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => BlogsEntity, (post) => post.user)
  blogs: BlogsEntity[];

  @OneToMany(() => CommentsEntity, (comment) => comment.user)
  comments: CommentsEntity[];
}
