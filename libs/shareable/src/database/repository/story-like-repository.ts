import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { StoryLikeEntity } from '@shareable/database/entities';

@Injectable()
export class StoryLikeRepository extends Repository<StoryLikeEntity> {
  constructor(dataSource: DataSource) {
    super(StoryLikeEntity, dataSource.createEntityManager());
  }
}
