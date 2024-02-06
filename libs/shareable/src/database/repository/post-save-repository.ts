import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { PostSaveEntity } from '@shareable/database/entities';

@Injectable()
export class PostSaveRepository extends Repository<PostSaveEntity> {
  constructor(dataSource: DataSource) {
    super(PostSaveEntity, dataSource.createEntityManager());
  }
}
