import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { FollowResDto } from './follow-res.dto';

export class StoryLikesResDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  url: string;

  @Expose()
  @ApiProperty({
    type: [FollowResDto],
  })
  @Type(() => FollowResDto)
  likes: FollowResDto[];

  @Expose()
  @ApiProperty()
  totalLikes: number;
}
