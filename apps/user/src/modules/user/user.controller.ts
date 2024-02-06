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
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/req/update-user.dto';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from '@core/response.interceptor';
import { UserGuard } from '../../gaurds/user.guard';
import { User } from '../../decoraters/user.decorator';
import { UserEntity } from '@shareable/database/entities';
import { UserDto, UserResDto } from './dto/res/user-res.dto';
import { EmptyResDto } from '@shareable/dto';
import { FollowUnfollowReqDto } from './dto/req/followUnfollow-req.dto';
import { FollowListingReqDto } from './dto/req/follow-listing-req.dto';
import { FollowListingResDto } from './dto/res/follow-listing-res.dto';
import { PostListingReqDto } from '../post/dto/req/post-listing-req.dto';
import { PostListingResDto } from '../post/dto/res/post-listing-res.dto';
import { SavePostListingResDto } from './dto/res/save-post-listing-res.dto';
import { StoryResDto } from './dto/res/story-res.dto';
import { StoryListingReqDto } from './dto/req/story-listing-req.dto';
import { StoryLikesResDto } from './dto/res/story-likes-res.dto';
import { FollowResDto } from './dto/res/follow-res.dto';

@Controller('user')
@ApiTags('User')
@ApiNotFoundResponse({ description: 'User not found' })
@ApiBearerAuth()
@UseGuards(UserGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiOkResponse({
    type: UserResDto,
  })
  @Response(UserResDto)
  profile(@User() user: UserEntity) {
    return this.userService.profile(user);
  }

  @Patch('profileEdit')
  @ApiOkResponse({
    type: UserDto,
  })
  @Response(UserDto)
  updateMe(@User() user: UserEntity, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateMe(user, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: EmptyResDto,
  })
  @Response(EmptyResDto)
  deleteAccount(@User() user: UserEntity) {
    return this.userService.deleteAccount(user);
  }

  @Post('followUnfollow')
  @ApiOkResponse({
    type: EmptyResDto,
  })
  @Response(EmptyResDto)
  followUnfollow(@User() user: UserEntity, @Body() body: FollowUnfollowReqDto) {
    return this.userService.followUnfollow(user, body);
  }

  @Get('followers')
  @ApiOkResponse({
    type: FollowListingResDto,
  })
  @Response(FollowListingResDto)
  followers(@Query() query: FollowListingReqDto, @User() user: UserEntity) {
    return this.userService.followers(query, user);
  }

  @Get('followings')
  @ApiOkResponse({
    type: FollowListingResDto,
  })
  @Response(FollowListingResDto)
  followings(@Query() query: FollowListingReqDto, @User() user: UserEntity) {
    return this.userService.followings(query, user);
  }

  @Get('myPosts')
  @ApiOkResponse({
    type: PostListingResDto,
  })
  @Response(PostListingResDto)
  myPosts(@Query() query: PostListingReqDto, @User() user: UserEntity) {
    return this.userService.myPosts(query, user);
  }

  @Get(':id/posts')
  @ApiOkResponse({
    type: PostListingResDto,
  })
  @Response(PostListingResDto)
  posts(@Query() query: PostListingReqDto, @Param('id') id: string) {
    return this.userService.posts(query, +id);
  }

  @Get(':id/profile')
  @ApiOkResponse({
    type: UserResDto,
  })
  @Response(UserResDto)
  userProfile(@Param('id') id: string) {
    return this.userService.userProfile(+id);
  }

  @Get(':id/followers')
  @ApiOkResponse({
    type: FollowListingResDto,
  })
  @Response(FollowListingResDto)
  userFollowers(@Query() query: FollowListingReqDto, @Param('id') id: string) {
    return this.userService.userFollowers(query, +id);
  }

  @Get(':id/followings')
  @ApiOkResponse({
    type: FollowListingResDto,
  })
  @Response(FollowListingResDto)
  userFollowings(@Query() query: FollowListingReqDto, @Param('id') id: string) {
    return this.userService.userFollowings(query, +id);
  }

  @Get('saved-posts')
  @ApiOkResponse({
    type: SavePostListingResDto,
  })
  @Response(SavePostListingResDto)
  savedPosts(@Query() query: PostListingReqDto, @User() user: UserEntity) {
    return this.userService.savedPosts(query, user);
  }

  @Get('myAllStories')
  @ApiOkResponse({
    type: StoryResDto,
  })
  @Response(StoryResDto)
  myAllStories(@Query() query: StoryListingReqDto, @User() user: UserEntity) {
    return this.userService.myAllStories(query, user);
  }

  @Get('myCurrentStories')
  @ApiOkResponse({
    type: StoryLikesResDto,
  })
  @Response(StoryLikesResDto)
  myCurrentStories(@User() user: UserEntity) {
    return this.userService.myCurrentStories(user);
  }

  @Get('suggestUser')
  @ApiOkResponse({
    type: FollowResDto,
  })
  @Response(FollowResDto)
  suggestUser(@User() user: UserEntity) {
    return this.userService.suggestUser(user);
  }
}
