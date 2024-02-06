import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { TagEntity } from '@shareable/database/entities';

@Injectable()
export class TagRepository extends Repository<TagEntity> {
  constructor(dataSource: DataSource) {
    super(TagEntity, dataSource.createEntityManager());
  }
}
