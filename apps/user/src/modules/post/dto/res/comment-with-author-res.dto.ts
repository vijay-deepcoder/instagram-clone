import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { FollowResDto } from '../../../user/dto/res/follow-res.dto';

export class CommentWithAuthorResDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  content: string;

  @Expose()
  @ApiProperty({
    type: FollowResDto,
  })
  @Type(() => FollowResDto)
  user: FollowResDto;

  @Expose()
  @ApiProperty()
  commentsLikeCount: number;
}
