import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { PostLikeEntity } from '@shareable/database/entities';

@Injectable()
export class PostLikeRepository extends Repository<PostLikeEntity> {
  constructor(dataSource: DataSource) {
    super(PostLikeEntity, dataSource.createEntityManager());
  }
}
