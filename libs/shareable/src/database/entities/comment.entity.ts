import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from '@shareable/database/entities/post.entity';
import { UserEntity } from '@shareable/database/entities/user.entity';

@Entity({
  name: 'comments',
})
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({
    name: 'author_id',
  })
  authorId: number;

  @Column({
    name: 'post_id',
  })
  postId: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @ManyToOne(() => PostEntity, (post) => post.comments, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author_id' })
  user: UserEntity;

  @ManyToMany(() => UserEntity, (user) => user.userCommentsLikes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'comment_likes',
    joinColumn: { name: 'comment_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  commentsLikes: UserEntity;
}
