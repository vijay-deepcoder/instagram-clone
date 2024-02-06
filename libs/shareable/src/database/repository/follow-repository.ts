import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { FollowEntity } from '@shareable/database/entities';

@Injectable()
export class FollowRepository extends Repository<FollowEntity> {
  constructor(dataSource: DataSource) {
    super(FollowEntity, dataSource.createEntityManager());
  }
}
