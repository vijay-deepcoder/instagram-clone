import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '@shareable/database/entities/user.entity';
import { PostEntity } from '@shareable/database/entities/post.entity';

@Entity({
  name: 'post_likes',
})
export class PostLikeEntity {
  @PrimaryColumn({
    name: 'post_id',
  })
  postId: number;

  @PrimaryColumn({
    name: 'user_id',
  })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.likedPosts, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.id, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;
}
