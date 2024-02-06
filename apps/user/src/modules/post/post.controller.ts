import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/req/create-post.dto';
import { UpdatePostDto } from './dto/req/update-post.dto';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from '@core/response.interceptor';
import { PostResDto } from './dto/res/post-res.dto';
import { UserGuard } from '../../gaurds/user.guard';
import { User } from '../../decoraters/user.decorator';
import { UserEntity } from '@shareable/database/entities';
import { PostListingReqDto } from './dto/req/post-listing-req.dto';
import { PostListingResDto } from './dto/res/post-listing-res.dto';
import { EmptyResDto } from '@shareable/dto';
import { LikeListingResDto } from './dto/res/like-listing-res.dto';
import { LikeListingReqDto } from './dto/req/like-listing-req.dto';
import { CommentListingReqDto } from './dto/req/comment-listing-req.dto';
import { CommentListingResDto } from './dto/res/comment-listing-res.dto';
import { TagsResDto } from './dto/res/tags-res.dto';

@Controller('post')
@ApiTags('Post')
@ApiNotFoundResponse({ description: 'Post not found' })
@ApiBearerAuth()
@UseGuards(UserGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOkResponse({
    type: PostResDto,
  })
  @Response(PostResDto)
  create(@User() user: UserEntity, @Body() body: CreatePostDto) {
    return this.postService.create(user, body);
  }

  @Get()
  @ApiOkResponse({
    type: PostListingResDto,
  })
  @Response(PostListingResDto)
  findAll(@Query() query: PostListingReqDto, @User() user: UserEntity) {
    return this.postService.findAll(query, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: EmptyResDto,
  })
  @Response(EmptyResDto)
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }

  @Get(':id/likes')
  @ApiOkResponse({
    type: LikeListingResDto,
  })
  @Response(LikeListingResDto)
  getLikes(@Query() query: LikeListingReqDto, @Param('id') id: string) {
    return this.postService.getLikes(query, +id);
  }

  @Get(':id/comments')
  @ApiOkResponse({
    type: CommentListingResDto,
  })
  @Response(CommentListingResDto)
  getComments(@Query() query: CommentListingReqDto, @Param('id') id: string) {
    return this.postService.getComments(query, +id);
  }

  @Get('tags')
  @ApiOkResponse({
    type: TagsResDto,
  })
  @Response(TagsResDto)
  tags() {
    return this.postService.tags();
  }
}
