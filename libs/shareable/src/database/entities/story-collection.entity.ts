import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '@shareable/database/entities/user.entity';
import { StoryEntity } from '@shareable/database/entities/story.entity';

@Entity({
  name: 'story_collections',
})
export class StoryCollectionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  thumbnail: string;

  @Column({ name: 'author_id' })
  authorId: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.collect)
  @JoinColumn({ name: 'author_id' })
  user: UserEntity;

  @OneToMany(() => StoryEntity, (story) => story.collection, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'story_saves',
    joinColumn: { name: 'collection_id' },
    inverseJoinColumn: { name: 'story_id' },
  })
  stories: StoryEntity;
}
