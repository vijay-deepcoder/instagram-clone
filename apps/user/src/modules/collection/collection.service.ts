import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/req/create-collection.dto';
import { UpdateCollectionDto } from './dto/req/update-collection.dto';
import { StoryCollectionRepository } from '@shareable/database/repository';
import { UserEntity } from '@shareable/database/entities';

@Injectable()
export class CollectionService {
  constructor(
    private readonly collectionRepository: StoryCollectionRepository,
  ) {}
  create(body: CreateCollectionDto, user: UserEntity) {
    return this.collectionRepository.save(
      this.collectionRepository.create({
        ...body,
        authorId: user.id,
      }),
    );
  }

  findAll() {
    return this.collectionRepository.find();
  }

  findOne(id: number) {
    return this.collectionRepository.findOneByOrFail({ id });
  }

  async update(id: number, body: UpdateCollectionDto) {
    const collection = await this.collectionRepository.findOneByOrFail({ id });
    return this.collectionRepository.save({ id: collection.id, ...body });
  }

  async remove(id: number) {
    const collection = await this.collectionRepository.findOneByOrFail({ id });
    return await this.collectionRepository.remove(collection);
  }
}
