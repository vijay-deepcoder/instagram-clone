import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserGuard } from '../../gaurds/user.guard';
import { EmptyResDto } from '@shareable/dto';
import { Response } from '@core/response.interceptor';
import { User } from '../../decoraters/user.decorator';
import { UserEntity } from '@shareable/database/entities';
import {
  CommentLikeUnlikeReqDto,
  PostLikeUnlikeReqDto,
  StoryLikeUnlikeReqDto,
} from './dto/req/post-like-unlike-req.dto';

@Controller('like')
@ApiTags('Like')
@ApiNotFoundResponse({ description: 'Like not found' })
@ApiBearerAuth()
@UseGuards(UserGuard)
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('postLikeUnlike')
  @ApiOkResponse({
    type: EmptyResDto,
  })
  @Response(EmptyResDto)
  postLikeUnlike(@User() user: UserEntity, @Body() body: PostLikeUnlikeReqDto) {
    return this.likeService.postLikeUnlike(user, body);
  }

  @Post('commentLikeUnlike')
  @ApiOkResponse({
    type: EmptyResDto,
  })
  @Response(EmptyResDto)
  commentLikeUnlike(
    @User() user: UserEntity,
    @Body() body: CommentLikeUnlikeReqDto,
  ) {
    return this.likeService.commentLikeUnlike(user, body);
  }

  @Post('storyLikeUnlike')
  @ApiOkResponse({
    type: EmptyResDto,
  })
  @Response(EmptyResDto)
  storyLikeUnlike(
    @User() user: UserEntity,
    @Body() body: StoryLikeUnlikeReqDto,
  ) {
    return this.likeService.storyLikeUnlike(user, body);
  }
}
