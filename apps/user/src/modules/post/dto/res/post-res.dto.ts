import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { FollowResDto } from '../../../user/dto/res/follow-res.dto';
import { PostTypeEnum } from '@core/enum';
import { TagsResDto } from './tags-res.dto';

export class PostResDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  url: string;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  location: string;

  @Expose()
  @ApiProperty()
  type: PostTypeEnum;

  @Expose()
  @ApiProperty({
    type: FollowResDto,
  })
  @Type(() => FollowResDto)
  author: FollowResDto;

  @Expose()
  @ApiProperty({
    type: TagsResDto,
  })
  @Type(() => TagsResDto)
  tags: TagsResDto;

  @Expose()
  @ApiProperty()
  likesCount: number;

  @Expose()
  @ApiProperty()
  commentsCount: number;

  @Expose()
  @ApiProperty()
  uploadBefore: number;
}
