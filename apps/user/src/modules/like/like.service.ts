import { Injectable } from '@nestjs/common';
import {
  CommentLikeRepository,
  PostLikeRepository,
  StoryLikeRepository,
} from '@shareable/database/repository';
import { UserEntity } from '@shareable/database/entities';
import {
  CommentLikeUnlikeReqDto,
  PostLikeUnlikeReqDto,
  StoryLikeUnlikeReqDto,
} from './dto/req/post-like-unlike-req.dto';

@Injectable()
export class LikeService {
  constructor(
    private readonly postLikeRepository: PostLikeRepository,
    private readonly commentLikeRepository: CommentLikeRepository,
    private readonly storyLikeRepository: StoryLikeRepository,
  ) {}

  async postLikeUnlike(user: UserEntity, body: PostLikeUnlikeReqDto) {
    const liked = await this.postLikeRepository.findOne({
      where: { userId: user.id, postId: body.id },
    });
    if (liked) {
      return await this.postLikeRepository.remove(liked);
    } else {
      return await this.postLikeRepository.save(
        this.postLikeRepository.create({
          userId: user.id,
          postId: body.id,
        }),
      );
    }
  }

  async commentLikeUnlike(user: UserEntity, body: CommentLikeUnlikeReqDto) {
    const liked = await this.commentLikeRepository.findOne({
      where: { userId: user.id, commentId: body.id },
    });
    if (liked) {
      return await this.commentLikeRepository.remove(liked);
    } else {
      return await this.commentLikeRepository.save(
        this.commentLikeRepository.create({
          userId: user.id,
          commentId: body.id,
        }),
      );
    }
  }

  async storyLikeUnlike(user: UserEntity, body: StoryLikeUnlikeReqDto) {
    const liked = await this.storyLikeRepository.findOne({
      where: { userId: user.id, storyId: body.id },
    });
    if (liked) {
      return await this.storyLikeRepository.remove(liked);
    } else {
      return await this.storyLikeRepository.save(
        this.storyLikeRepository.create({
          userId: user.id,
          storyId: body.id,
        }),
      );
    }
  }
}
