import { Injectable } from '@nestjs/common';
import { PostRepository } from '@shareable/database/repository';
import { SearchListingReqDto } from './dto/req/search-listing.req.dto';
import { PaginationMetaDto } from '@shareable/dto';
import { Brackets } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(private readonly postRepository: PostRepository) {}

  async search(query: SearchListingReqDto) {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.likes', 'likes')
      .leftJoinAndSelect('post.tags', 'tags')
      .leftJoinAndSelect('post.author', 'user')
      .groupBy('post.id')
      .addGroupBy('likes.id')
      .addGroupBy('tags.id')
      .addGroupBy('user.id')
      .orderBy('COUNT(likes.id)', 'DESC');

    if (query.search) {
      let search = query.search;
      if (search.includes('#')) {
        const splitSearch = search.split('#');
        posts.where('tags.name = :search', { search: splitSearch[1] });
      } else {
        posts.where(
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
    }
    const [items, count] = await posts.getManyAndCount();
    return {
      items: items,
      pagination: new PaginationMetaDto(query, count),
    };
  }
}
