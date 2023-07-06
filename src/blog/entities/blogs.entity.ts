/* eslint-disable prettier/prettier */
import { CommentsEntity } from 'src/comments/entities/comments.entity';
import { UsersEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('blogs')
export class BlogsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({
    name: 'author_name',
  })
  authorName: string;

  @Column({
    name: 'created_by',
  })
  createdBy: number;

  @Column({
    name: 'created_on',
  })
  createdOn: Date;

  @Column({
    name: 'updated_by',
  })
  updatedBy: number;

  @Column({
    name: 'updated_on',
  })
  updatedOn: Date;

  @ManyToOne(() => UsersEntity, (user) => user.blogs)
  user: UsersEntity;

  @OneToMany(() => CommentsEntity, (comment) => comment.blog)
  comments: CommentsEntity[];
}
