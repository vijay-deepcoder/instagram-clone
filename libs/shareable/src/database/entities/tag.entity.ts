import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from '@shareable/database/entities/post.entity';

@Entity({
  name: 'tags',
})
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @ManyToMany(() => PostEntity, (post) => post.tags, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'post_tags',
    joinColumn: { name: 'tag_id' },
    inverseJoinColumn: { name: 'post_id' },
  })
  posts: PostEntity[];
}
