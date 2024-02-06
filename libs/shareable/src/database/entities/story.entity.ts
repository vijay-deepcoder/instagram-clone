import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '@shareable/database/entities/user.entity';
import { StoryStatusEnum } from '@core/enum';
import { MusicEntity } from '@shareable/database/entities/music.entity';
import { StoryCollectionEntity } from '@shareable/database/entities/story-collection.entity';

@Entity({
  name: 'stories',
})
export class StoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({
    name: 'music_id',
    default: null,
  })
  musicId: number;

  @Column({ name: 'author_id' })
  authorId: number;

  @Column({
    enum: StoryStatusEnum,
    type: 'enum',
    default: StoryStatusEnum.active,
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

  @ManyToOne(() => UserEntity, (user) => user.stories)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;

  @ManyToMany(() => UserEntity, (user) => user.storyLikes, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'story_likes',
    joinColumn: { name: 'story_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  likes: UserEntity[];

  @OneToOne(() => MusicEntity, (music) => music.story)
  @JoinColumn({ name: 'music_id' })
  music: MusicEntity;

  @ManyToOne(() => StoryCollectionEntity, (collection) => collection.stories, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'story_saves',
    joinColumn: { name: 'story_id' },
    inverseJoinColumn: { name: 'collection_id' },
  })
  collection: UserEntity;
}
