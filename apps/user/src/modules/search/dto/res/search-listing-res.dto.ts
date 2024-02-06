import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PostResDto } from '../../../post/dto/res/post-res.dto';
import { PaginationResDto } from '@shareable/dto';

export class SearchListingResDto {
  @Expose()
  @ApiProperty({
    type: [PostResDto],
  })
  @Type(() => PostResDto)
  items: PostResDto[];

  @Expose()
  @ApiProperty({
    type: PaginationResDto,
  })
  @Type(() => PaginationResDto)
  pagination: PaginationResDto;
}
