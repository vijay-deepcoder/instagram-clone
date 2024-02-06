import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { StatusEnum, TypeEnum } from '@core/enum';
import { CommentEntity } from '@shareable/database/entities/comment.entity';
import { PostEntity } from '@shareable/database/entities/post.entity';
import { StoryEntity } from '@shareable/database/entities/story.entity';
import { ApiException, ErrorCodes } from '@core/exception';
import { FollowEntity } from '@shareable/database/entities/follow.entity';
import { StoryCollectionEntity } from '@shareable/database/entities/story-collection.entity';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Index()
  username: string;

  @Column({
    unique: true,
  })
  @Index()
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
    name: 'profile_image',
  })
  profileImage?: string | null;

  @Column({
    nullable: true,
  })
  bio?: string | null;

  @Column({
    nullable: true,
  })
  websiteUrl?: string | null;

  @Column({
    enum: TypeEnum,
    type: 'enum',
    default: TypeEnum.public,
  })
  type: string;

  @Column({
    enum: StatusEnum,
    type: 'enum',
    default: StatusEnum.active,
  })
  status: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @OneToMany(() => PostEntity, (post) => post.author)
  posts: PostEntity[];

  @OneToMany(() => StoryEntity, (story) => story.author)
  stories: StoryEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @ManyToMany(() => CommentEntity, (comment) => comment.commentsLikes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'comment_likes',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'comment_id' }],
  })
  userCommentsLikes: CommentEntity[];

  @ManyToMany(() => UserEntity, (user) => user.followers, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'follows',
    joinColumn: { name: 'follower_id' },
    inverseJoinColumn: { name: 'following_id' },
  })
  following: UserEntity[];

  @OneToMany(() => FollowEntity, (follow) => follow.followers)
  followers: FollowEntity[];

  @OneToMany(() => FollowEntity, (follow) => follow.followings)
  followings: FollowEntity[];

  @ManyToMany(() => PostEntity, (post) => post.likes, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'post_likes',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'post_id' },
  })
  likedPosts: PostEntity[];

  @ManyToMany(() => PostEntity, (post) => post.savedUser, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'post_saves',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'post_id' },
  })
  savedPosts: PostEntity[];

  @ManyToMany(() => StoryEntity, (story) => story.likes, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'story_likes',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'story_id' },
  })
  storyLikes: StoryEntity[];

  @OneToMany(() => StoryCollectionEntity, (c) => c.user)
  collect: StoryCollectionEntity[];

  isActiveCheck() {
    if (this.status == StatusEnum.inActive) {
      throw new ApiException(ErrorCodes.AccountBan);
    }
  }
}
