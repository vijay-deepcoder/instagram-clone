import { Entity, JoinColumn, ManyToMany, PrimaryColumn } from 'typeorm';
import { PostEntity } from '@shareable/database/entities/post.entity';
import { TagEntity } from '@shareable/database/entities/tag.entity';

@Entity({
  name: 'post_tags',
})
export class PostTagEntity {
  @PrimaryColumn({
    name: 'post_id',
  })
  postId: number;

  @PrimaryColumn({
    name: 'tag_id',
  })
  tagId: number;

  @ManyToMany(() => TagEntity, (tag) => tag.posts, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'tag_id' })
  tag: TagEntity;

  @ManyToMany(() => PostEntity, (post) => post.id, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;
}
