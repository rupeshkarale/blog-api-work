/* eslint-disable prettier/prettier */
import { BlogsEntity } from 'src/blog/entities/blogs.entity';
import { UsersEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
// import { BlogPost } from './path/to/blog-post.entity';
// import { User } from './path/to/user.entity';

@Entity('comments')
export class CommentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  createdOn: Date;

  @Column()
  createdBy: number;

  @Column()
  updatedOn: Date;

  @Column()
  updatedBy: number;

  @Column()
  blogId: number;

  @Column()
  userName: string;

  @ManyToOne(() => BlogsEntity, (post) => post.comments)
  @JoinColumn({ name: 'blogId' })
  blog: BlogsEntity;

  @ManyToOne(() => UsersEntity, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  user: UsersEntity;
}
