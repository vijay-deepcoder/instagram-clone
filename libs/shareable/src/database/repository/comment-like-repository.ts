import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { CommentLikeEntity } from '@shareable/database/entities';

@Injectable()
export class CommentLikeRepository extends Repository<CommentLikeEntity> {
  constructor(dataSource: DataSource) {
    super(CommentLikeEntity, dataSource.createEntityManager());
  }
}
