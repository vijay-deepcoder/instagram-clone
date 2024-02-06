import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentEntity } from '@shareable/database/entities/comment.entity';
import { MusicEntity } from '@shareable/database/entities/music.entity';
import { UserEntity } from '@shareable/database/entities/user.entity';
import { PostStatusEnum, PostTypeEnum } from '@core/enum';
import { TagEntity } from '@shareable/database/entities/tag.entity';

@Entity({
  name: 'posts',
})
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  location: string;

  @Column({
    name: 'author_id',
  })
  authorId: number;

  @Column({
    enum: PostStatusEnum,
    type: 'enum',
    default: PostStatusEnum.active,
  })
  status: string;

  @Column({
    enum: PostTypeEnum,
    type: 'enum',
    default: PostTypeEnum.post,
  })
  type: string;

  @Column({
    name: 'music_id',
    default: null,
  })
  musicId: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity;

  @OneToOne(() => MusicEntity, (music) => music.posts)
  @JoinColumn({ name: 'music_id' })
  music: MusicEntity;

  @ManyToMany(() => UserEntity, (postLike) => postLike.likedPosts, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'post_likes',
    joinColumn: { name: 'post_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  likes: UserEntity[];

  @ManyToMany(() => UserEntity, (user) => user.savedPosts, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'post_saves',
    joinColumn: { name: 'post_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  savedUser: UserEntity[];

  @ManyToMany(() => TagEntity, (tag) => tag.posts, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'post_tags',
    joinColumn: { name: 'post_id' },
    inverseJoinColumn: { name: 'tag_id' },
  })
  tags: TagEntity[];
}
