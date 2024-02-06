import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '@shareable/database/entities/user.entity';

@Entity({
  name: 'follows',
})
export class FollowEntity {
  @PrimaryColumn({
    name: 'follower_id',
  })
  followerId: number;

  @PrimaryColumn({
    name: 'following_id',
  })
  followingId: number;

  @ManyToOne(() => UserEntity, (u) => u.followers, {
    cascade: true,
  })
  @JoinColumn({ name: 'follower_id' })
  followers: UserEntity;

  @ManyToOne(() => UserEntity, (u) => u.followings, {
    cascade: true,
  })
  @JoinColumn({ name: 'following_id' })
  followings: UserEntity;
}
