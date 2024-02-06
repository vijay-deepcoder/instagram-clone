import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from '@shareable/database/entities/post.entity';
import { StoryEntity } from '@shareable/database/entities/story.entity';

@Entity({
  name: 'musics',
})
export class MusicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    name: 'artist_name',
  })
  artistName: string;

  @Column()
  icon: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @ManyToOne(() => PostEntity, (post) => post.music)
  posts: PostEntity;

  @ManyToOne(() => StoryEntity, (story) => story.music)
  story: PostEntity;
}
