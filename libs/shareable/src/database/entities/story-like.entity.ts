import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '@shareable/database/entities/user.entity';
import { StoryEntity } from '@shareable/database/entities/story.entity';

@Entity({
  name: 'story_likes',
})
export class StoryLikeEntity {
  @PrimaryColumn({
    name: 'story_id',
  })
  storyId: number;

  @PrimaryColumn({
    name: 'user_id',
  })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.stories, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => StoryEntity, (story) => story.id, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'story_id' })
  story: StoryEntity;
}
