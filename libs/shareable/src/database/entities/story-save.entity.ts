import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { StoryEntity } from '@shareable/database/entities/story.entity';
import { StoryCollectionEntity } from '@shareable/database/entities/story-collection.entity';

@Entity({
  name: 'story_saves',
})
export class StorySaveEntity {
  @PrimaryColumn({
    name: 'story_id',
  })
  storyId: number;

  @PrimaryColumn({
    name: 'collection_id',
  })
  collectionId: number;

  @ManyToOne(() => StoryEntity, (story) => story.id, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'story_id' })
  story: StoryEntity;

  @ManyToOne(() => StoryCollectionEntity, (collection) => collection.id, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'collection_id' })
  collection: StoryEntity;
}
