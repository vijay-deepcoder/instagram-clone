import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { PostEntity } from '@shareable/database/entities';

@Injectable()
export class PostRepository extends Repository<PostEntity> {
  constructor(dataSource: DataSource) {
    super(PostEntity, dataSource.createEntityManager());
  }
}
