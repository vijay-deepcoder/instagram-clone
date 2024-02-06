import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/req/create-post.dto';
import { UpdatePostDto } from './dto/req/update-post.dto';
import {
  PostRepository,
  PostTagRepository,
  TagRepository,
} from '@shareable/database/repository';
import { UserEntity } from '@shareable/database/entities';
import { PostListingReqDto } from './dto/req/post-listing-req.dto';
import { PaginationMetaDto } from '@shareable/dto';
import { LikeListingReqDto } from './dto/req/like-listing-req.dto';
import { Brackets } from 'typeorm';
import { CommentListingReqDto } from './dto/req/comment-listing-req.dto';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private postTagRepository: PostTagRepository,
    private tagRepository: TagRepository,
  ) {}
  async create(user: UserEntity, body: CreatePostDto) {
    const post = await this.postRepository.save(
      this.postRepository.create({
        authorId: user.id,
        ...body,
      }),
    );
    if (body.tagId) {
      await this.postTagRepository.save(
        this.postTagRepository.create({
          postId: post.id,
          tagId: body.tagId,
        }),
      );
    }
    return post;
  }

  async findAll(query: PostListingReqDto, user: UserEntity) {
    const postQuery = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.likes', 'likes')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoinAndSelect('post.tags', 'tags')
      .leftJoin(
        'author.followers',
        'follower',
        'follower.followerId = :userId',
        { userId: user.id },
      )
      .leftJoin(
        'author.followings',
        'following',
        'following.followingId = :userId',
        { userId: user.id },
      )
      .where('post.type = :postType', { postType: query.postType })
      .andWhere(
        '(follower.followerId = :userId OR following.followingId = :userId )',
        { userId: user.id },
      )
      .addSelect('COUNT(likes.id)', 'likesCount')
      .addSelect('COUNT(comments.id)', 'commentsCount')
      .groupBy('post.id')
      .addGroupBy('author.id')
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

  async update(id: number, body: UpdatePostDto) {
    const post = await this.postRepository.findOneOrFail({ where: { id } });
    if (post) {
      if (body) {
        return this.postRepository.save({
          id: post.id,
          ...body,
        });
      }
      return post;
    }
  }

  async getLikes(query: LikeListingReqDto, id: number) {
    const postQuery = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.likes', 'likes')
      .where('post.id = :postId', { postId: id })
      .skip(query.skip)
      .take(query.perPage)
      .orderBy('post.id', query.orderBy);

    if (query.search) {
      postQuery.andWhere(
        new Brackets((qb) => {
          qb.where('likes.name ILIKE :search', { search: `%${query.search}%` })
            .orWhere('likes.username ILIKE :search', {
              search: `%${query.search}%`,
            })
            .orWhere('likes.email ILIKE :search', {
              search: `%${query.search}%`,
            });
        }),
      );
    }
    const items = await postQuery.getOne();
    return {
      items: items.likes,
      pagination: new PaginationMetaDto(query, 1),
    };
  }

  async getComments(query: CommentListingReqDto, id: number) {
    const postQuery = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoinAndSelect('comments.user', 'user')
      .leftJoinAndSelect('comments.commentsLikes', 'likes')
      .where('post.id = :postId', { postId: id })
      .addSelect('COUNT(likes.id)', 'commentsLikeCount')
      .groupBy('post.id')
      .addGroupBy('comments.id')
      .addGroupBy('user.id')
      .addGroupBy('likes.id')
      .skip(query.skip)
      .take(query.perPage)
      .orderBy('post.id', query.orderBy);

    const postWithComments = await postQuery.getOne();

    const items = postWithComments.comments.map((comment) => ({
      ...comment,
      commentsLikeCount: comment.commentsLikes.length,
    }));
    return {
      items: items,
      pagination: new PaginationMetaDto(query, 1),
    };
  }

  tags() {
    return this.tagRepository.find();
  }

  async remove(id: number) {
    const post = await this.postRepository.findOneOrFail({ where: { id } });
    return await this.postRepository.remove(post);
  }
}
