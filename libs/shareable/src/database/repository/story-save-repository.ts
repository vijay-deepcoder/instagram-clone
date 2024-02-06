import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { StorySaveEntity } from '@shareable/database/entities';

@Injectable()
export class StorySaveRepository extends Repository<StorySaveEntity> {
  constructor(dataSource: DataSource) {
    super(StorySaveEntity, dataSource.createEntityManager());
  }
}
