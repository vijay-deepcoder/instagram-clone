import { Injectable } from '@nestjs/common';
import { StoryRepository } from '@shareable/database/repository';
import { StoryCreateReqDto } from './dto/req/story-create-req.dto';
import { UserEntity } from '@shareable/database/entities';
import { StoryStatusEnum } from '@core/enum';
import { StoryListingReqDto } from './dto/req/story-listing-req.dto';

@Injectable()
export class StoryService {
  constructor(private readonly storyRepository: StoryRepository) {}

  async create(body: StoryCreateReqDto, user: UserEntity) {
    return this.storyRepository.save(
      this.storyRepository.create({
        ...body,
        authorId: user.id,
      }),
    );
  }

  findOne(id: number) {
    return this.storyRepository.findOneOrFail({
      where: { id },
      relations: {
        music: true,
      },
    });
  }

  findAll(query: StoryListingReqDto) {
    return this.storyRepository.find({
      where: { status: StoryStatusEnum.active },
      relations: {
        music: true,
      },
      take: query.perPage,
      skip: query.skip,
    });
  }

  async remove(id: number) {
    const story = await this.storyRepository.findOneOrFail({ where: { id } });
    return this.storyRepository.remove(story);
  }
}
