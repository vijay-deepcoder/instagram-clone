import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { StoryCollectionEntity } from '@shareable/database/entities';

@Injectable()
export class StoryCollectionRepository extends Repository<StoryCollectionEntity> {
  constructor(dataSource: DataSource) {
    super(StoryCollectionEntity, dataSource.createEntityManager());
  }
}
