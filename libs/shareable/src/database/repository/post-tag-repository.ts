import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { PostTagEntity } from '@shareable/database/entities/post-tag.entity';

@Injectable()
export class PostTagRepository extends Repository<PostTagEntity> {
  constructor(dataSource: DataSource) {
    super(PostTagEntity, dataSource.createEntityManager());
  }
}
