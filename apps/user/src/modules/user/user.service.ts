import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { UserEntity } from '@shareable/database/entities';
import {
  FollowRepository,
  PostRepository,
  StoryRepository,
  UserRepository,
} from '@shareable/database/repository';
import { StatusEnum } from '@core/enum';
import { FollowUnfollowReqDto } from './dto/req/followUnfollow-req.dto';
import { FollowListingReqDto } from './dto/req/follow-listing-req.dto';
import { PaginationMetaDto } from '@shareable/dto';
import { Brackets } from 'typeorm';
import { PostListingReqDto } from '../post/dto/req/post-listing-req.dto';
import { StoryListingReqDto } from './dto/req/story-listing-req.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private postRepository: PostRepository,
    private followRepository: FollowRepository,
    private storyRepository: StoryRepository,
  ) {}
  // findAll() {
  //   return `This action returns all user`;
  // }

  async profile(user: UserEntity) {
    const me = await this.userRepository.findOneOrFail({
      where: { id: user.id },
    });
    const postCount = await this.postRepository.count({
      where: { authorId: user.id },
    });
    const followersCount = await this.followRepository
      .createQueryBuilder('follow')
      .leftJoinAndSelect('follow.followers', 'user')
      .where('follow.followingId = :userId', { userId: user.id })
      .getCount();

    const followingsCount = await this.followRepository
      .createQueryBuilder('follow')
      .leftJoinAndSelect('follow.followings', 'user')
      .where('follow.followerId = :userId', { userId: user.id })
      .getCount();
    return {
      user: me,
      posts: postCount,
      followers: followersCount,
      followings: followingsCount,
    };
  }

  updateMe(user: UserEntity, body: UpdateUserDto) {
    return this.userRepository.save({
      id: user.id,
      ...body,
    });
  }

  async followUnfollow(user: UserEntity, body: FollowUnfollowReqDto) {
    const followed = await this.followRepository.findOne({
      where: { followerId: user.id, followingId: body.id },
    });
    if (followed) {
      return await this.followRepository.remove(followed);
    } else {
      return await this.followRepository.save(
        this.followRepository.create({
          followerId: user.id,
          followingId: body.id,
        }),
      );
    }
  }

  deleteAccount(user: UserEntity) {
    return this.userRepository.save({
      id: user.id,
      status: StatusEnum.inActive,
    });
  }

  async followers(query: FollowListingReqDto, user: UserEntity) {
    const followQuery = await this.followRepository
      .createQueryBuilder('follow')
      .leftJoinAndSelect('follow.followers', 'user')
      .where('follow.followingId = :userId', { userId: user.id })
      .skip(query.skip)
      .take(query.perPage);

    if (query.search) {
      followQuery.andWhere(
        new Brackets((qb) => {
          qb.where('user.name ILIKE :search', { search: `%${query.search}%` })
            .orWhere('user.username ILIKE :search', {
              search: `%${query.search}%`,
            })
            .orWhere('user.email ILIKE :search', {
              search: `%${query.search}%`,
            });
        }),
      );
    }
    const [items, counts] = await followQuery.getManyAndCount();
    const users = items.map((item) => item.followers);
    return {
      items: users,
      pagination: new PaginationMetaDto(query, counts),
    };
  }
  async followings(query: FollowListingReqDto, user: UserEntity) {
    const followQuery = await this.followRepository
      .createQueryBuilder('follow')
      .leftJoinAndSelect('follow.followings', 'user')
      .where('follow.followerId = :userId', { userId: user.id })
      .skip(query.skip)
      .take(query.perPage);
    if (query.search) {
      followQuery.andWhere(
        new Brackets((qb) => {
          qb.where('user.name ILIKE :search', { search: `%${query.search}%` })
            .orWhere('user.username ILIKE :search', {
              search: `%${query.search}%`,
            })
            .orWhere('user.email ILIKE :search', {
              search: `%${query.search}%`,
            });
        }),
      );
    }
    const [items, counts] = await followQuery.getManyAndCount();
    const users = items.map((item) => item.followings);
    return {
      items: users,
      pagination: new PaginationMetaDto(query, counts),
    };
  }

  async myPosts(query: PostListingReqDto, user: UserEntity) {
    const postQuery = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.likes', 'likes')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoinAndSelect('post.tags', 'tags')
      .where('post.author_id = :userId', { userId: user.id })
      .andWhere('post.type = :postType', { postType: query.postType })
      .addSelect('COUNT(likes.id)', 'likesCount')
      .addSelect('COUNT(comments.id)', 'commentsCount')
      .groupBy('post.id')
      .addGroupBy('likes.id')
      .addGroupBy('comments.id')
      .addGroupBy('tags.id')
      .skip(query.skip)
      .take(query.perPage)
      .orderBy('post.id', query.orderBy);

    const { entities: items, raw: rawItems } =
      await postQuery.getRawAndEntities();

    const uploadedTime = items.map((item) => {
      const postCreatedAt = new Date(item.createdAt);
      const currentTime = new Date();
      const timeDifference = currentTime - postCreatedAt;

      let time;
      let difference = Math.floor(timeDifference / 1000);
      if (difference < 60) {
        time = `${difference} seconds`;
      } else if (difference < 3600) {
        difference = Math.floor(difference / 60);
        time = `${difference} minutes`;
      } else if (difference < 86400) {
        difference = Math.floor(difference / 60 / 60);
        time = `${difference} hours`;
      } else if (difference < 2592000) {
        difference = Math.floor(difference / 60 / 60 / 24);
        time = `${difference} days`;
      } else if (difference < 31536000) {
        difference = Math.floor(difference / 60 / 60 / 24 / 30);
        time = `${difference} months`;
      } else if (difference > 31536000) {
        difference = Math.floor(difference / 60 / 60 / 24 / 30 / 12);
        time = `${difference} years`;
      }
      return time;
    });

    const postsWithLikesCount = items.map((item, index) => ({
      ...item,
      likesCount: parseInt(rawItems[index].likesCount),
      commentsCount: parseInt(rawItems[index].commentsCount),
      uploadBefore: uploadedTime[0],
    }));
    return {
      items: postsWithLikesCount,
      pagination: new PaginationMetaDto(query, items.length),
    };
  }

  async posts(query: PostListingReqDto, id: number) {
    const postQuery = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.likes', 'likes')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoinAndSelect('post.tags', 'tags')
      .where('post.author_id = :userId', { userId: id })
      .andWhere('post.type = :postType', { postType: query.postType })
      .addSelect('COUNT(likes.id)', 'likesCount')
      .addSelect('COUNT(comments.id)', 'commentsCount')
      .groupBy('post.id')
      .addGroupBy('likes.id')
      .addGroupBy('comments.id')
      .addGroupBy('tags.id')
      .skip(query.skip)
      .take(query.perPage)
      .orderBy('post.id', query.orderBy);

    const { entities: items, raw: rawItems } =
      await postQuery.getRawAndEntities();

    const uploadedTime = items.map((item) => {
      const postCreatedAt = new Date(item.createdAt);
      const currentTime = new Date();
      const timeDifference = currentTime - postCreatedAt;

      let time;
      let difference = Math.floor(timeDifference / 1000);
      if (difference < 60) {
        time = `${difference} seconds`;
      } else if (difference < 3600) {
        difference = Math.floor(difference / 60);
        time = `${difference} minutes`;
      } else if (difference < 86400) {
        difference = Math.floor(difference / 60 / 60);
        time = `${difference} hours`;
      } else if (difference < 2592000) {
        difference = Math.floor(difference / 60 / 60 / 24);
        time = `${difference} days`;
      } else if (difference < 31536000) {
        difference = Math.floor(difference / 60 / 60 / 24 / 30);
        time = `${difference} months`;
      } else if (difference > 31536000) {
        difference = Math.floor(difference / 60 / 60 / 24 / 30 / 12);
        time = `${difference} years`;
      }
      return time;
    });

    const postsWithLikesCount = items.map((item, index) => ({
      ...item,
      likesCount: parseInt(rawItems[index].likesCount),
      commentsCount: parseInt(rawItems[index].commentsCount),
      uploadBefore: uploadedTime[0],
    }));
    return {
      items: postsWithLikesCount,
      pagination: new PaginationMetaDto(query, items.length),
    };
  }

  async userProfile(id: number) {
    const user = await this.userRepository.findOneOrFail({
      where: { id: id },
    });
    const postCount = await this.postRepository.count({
      where: { authorId: id },
    });
    const followersCount = await this.followRepository
      .createQueryBuilder('follow')
      .leftJoinAndSelect('follow.followers', 'user')
      .where('follow.followingId = :userId', { userId: id })
      .getCount();

    const followingsCount = await this.followRepository
      .createQueryBuilder('follow')
      .leftJoinAndSelect('follow.followings', 'user')
      .where('follow.followerId = :userId', { userId: id })
      .getCount();
    return {
      user,
      posts: postCount,
      followers: followersCount,
      followings: followingsCount,
    };
  }

  async userFollowers(query: FollowListingReqDto, id: number) {
    const followQuery = await this.followRepository
      .createQueryBuilder('follow')
      .leftJoinAndSelect('follow.followers', 'user')
      .where('follow.followingId = :userId', { userId: id })
      .skip(query.skip)
      .take(query.perPage);

    if (query.search) {
      followQuery.andWhere(
        new Brackets((qb) => {
          qb.where('user.name ILIKE :search', { search: `%${query.search}%` })
            .orWhere('user.username ILIKE :search', {
              search: `%${query.search}%`,
            })
            .orWhere('user.email ILIKE :search', {
              search: `%${query.search}%`,
            });
        }),
      );
    }
    const [items, counts] = await followQuery.getManyAndCount();
    const users = items.map((item) => item.followers);
    return {
      items: users,
      pagination: new PaginationMetaDto(query, counts),
    };
  }
  async userFollowings(query: FollowListingReqDto, id: number) {
    const followQuery = await this.followRepository
      .createQueryBuilder('follow')
      .leftJoinAndSelect('follow.followings', 'user')
      .where('follow.followerId = :userId', { userId: id })
      .skip(query.skip)
      .take(query.perPage);
    if (query.search) {
      followQuery.andWhere(
        new Brackets((qb) => {
          qb.where('user.name ILIKE :search', { search: `%${query.search}%` })
            .orWhere('user.username ILIKE :search', {
              search: `%${query.search}%`,
            })
            .orWhere('user.email ILIKE :search', {
              search: `%${query.search}%`,
            });
        }),
      );
    }
    const [items, counts] = await followQuery.getManyAndCount();
    const users = items.map((item) => item.followings);
    return {
      items: users,
      pagination: new PaginationMetaDto(query, counts),
    };
  }

  async savedPosts(query: PostListingReqDto, user: UserEntity) {
    const postQuery = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.savedPosts', 'savedPosts')
      .skip(query.skip)
      .take(query.perPage)
      .orderBy('savedPosts.id')
      .getOne();
    const items = postQuery.savedPosts;
    return {
      items: items,
      pagination: new PaginationMetaDto(query, 1),
    };
  }

  async myAllStories(query: StoryListingReqDto, user: UserEntity) {
    return await this.storyRepository.find({
      where: { authorId: user.id },
      relations: {
        music: true,
      },
      take: query.perPage,
      skip: query.skip,
      order: {
        createdAt: query.orderBy,
      },
    });
  }

  async myCurrentStories(user: UserEntity) {
    const storyQuery = await this.storyRepository
      .createQueryBuilder('story')
      .leftJoinAndSelect('story.likes', 'likes')
      .leftJoinAndSelect('story.music', 'music')
      .where('story.author_id = :user', { user: user.id })
      .getOne();

    const items = {
      ...storyQuery,
      totalLikes: storyQuery.likes.length,
    };

    return items;
  }

  async suggestUser(user: UserEntity) {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.following', 'following')
      .leftJoinAndSelect('following.following', 'followingsFollowing')
      .where('user.id = :userId', { userId: user.id })
      .getOne();

    const suggestion = users.following.map((follow) => {
      return follow.following.filter((item) => item.id !== user.id);
    });
    return suggestion;
  }
}
