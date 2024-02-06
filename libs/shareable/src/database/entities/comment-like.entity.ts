import { Entity, JoinColumn, ManyToMany, PrimaryColumn } from 'typeorm';
import { CommentEntity } from '@shareable/database/entities/comment.entity';
import { UserEntity } from '@shareable/database/entities/user.entity';

@Entity({
  name: 'comment_likes',
})
export class CommentLikeEntity {
  @PrimaryColumn({
    name: 'comment_id',
  })
  commentId: number;

  @PrimaryColumn({
    name: 'user_id',
  })
  userId: number;

  @ManyToMany(() => CommentEntity, (comment) => comment.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'comment_id' })
  comments: CommentEntity[];

  @ManyToMany(() => UserEntity, (user) => user.comments, {
    createForeignKeyConstraints: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  users: UserEntity[];
}
