import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { StoryEntity } from '@shareable/database/entities';

@Injectable()
export class StoryRepository extends Repository<StoryEntity> {
  constructor(dataSource: DataSource) {
    super(StoryEntity, dataSource.createEntityManager());
  }
}
