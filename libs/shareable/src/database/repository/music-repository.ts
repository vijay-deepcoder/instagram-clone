import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { MusicEntity } from '@shareable/database/entities';

@Injectable()
export class MusicRepository extends Repository<MusicEntity> {
  constructor(dataSource: DataSource) {
    super(MusicEntity, dataSource.createEntityManager());
  }
}
