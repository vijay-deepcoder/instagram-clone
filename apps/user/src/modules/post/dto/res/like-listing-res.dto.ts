import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationResDto } from '@shareable/dto';
import { FollowResDto } from '../../../user/dto/res/follow-res.dto';

export class LikeListingResDto {
  @Expose()
  @ApiProperty({
    type: [FollowResDto],
  })
  @Type(() => FollowResDto)
  items: FollowResDto[];

  @Expose()
  @ApiProperty({
    type: PaginationResDto,
  })
  @Type(() => PaginationResDto)
  pagination: PaginationResDto;
}
