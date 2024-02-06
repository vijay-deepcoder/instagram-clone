import { Global, Module } from '@nestjs/common';
import { ModeratorRepository } from '@shareable/database/repository/moderator-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CommentEntity,
  CommentLikeEntity,
  FollowEntity,
  ModeratorEntity,
  MusicEntity,
  PostEntity,
  PostLikeEntity,
  PostSaveEntity,
  StoryCollectionEntity,
  StoryEntity,
  StoryLikeEntity,
  StorySaveEntity,
  TagEntity,
  UserEntity,
} from '@shareable/database/entities';
import { UserRepository } from '@shareable/database/repository/user-repository';
import { CommentRepository } from '@shareable/database/repository/comment-repository';
import { CommentLikeRepository } from '@shareable/database/repository/comment-like-repository';
import { FollowRepository } from '@shareable/database/repository/follow-repository';
import { MusicRepository } from '@shareable/database/repository/music-repository';
import { PostRepository } from '@shareable/database/repository/post-repository';
import { PostLikeRepository } from '@shareable/database/repository/post-like-repository';
import { PostSaveRepository } from '@shareable/database/repository/post-save-repository';
import { StoryLikeRepository } from '@shareable/database/repository/story-like-repository';
import { StoryRepository } from '@shareable/database/repository/story-repository';
import { StoryCollectionRepository } from '@shareable/database/repository/story-collection-repository';
import { StorySaveRepository } from '@shareable/database/repository/story-save-repository';
import { TagRepository } from '@shareable/database/repository/tag-repository';
import { PostTagEntity } from '@shareable/database/entities/post-tag.entity';
import { PostTagRepository } from '@shareable/database/repository/post-tag-repository';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ModeratorEntity,
      UserEntity,
      CommentEntity,
      CommentLikeEntity,
      FollowEntity,
      MusicEntity,
      PostEntity,
      PostLikeEntity,
      PostSaveEntity,
      StoryEntity,
      StoryLikeEntity,
      StoryCollectionEntity,
      StorySaveEntity,
      TagEntity,
      PostTagEntity,
    ]),
  ],
  providers: [
    ModeratorRepository,
    UserRepository,
    CommentRepository,
    CommentLikeRepository,
    FollowRepository,
    MusicRepository,
    PostRepository,
    PostLikeRepository,
    PostSaveRepository,
    StoryLikeRepository,
    StoryRepository,
    StoryCollectionRepository,
    StorySaveRepository,
    TagRepository,
    PostTagRepository,
  ],
  exports: [
    ModeratorRepository,
    UserRepository,
    CommentRepository,
    CommentLikeRepository,
    FollowRepository,
    MusicRepository,
    PostRepository,
    PostLikeRepository,
    PostSaveRepository,
    StoryLikeRepository,
    StoryRepository,
    StoryCollectionRepository,
    TagRepository,
    PostTagRepository,
  ],
})
export class RepositoryModule {}
