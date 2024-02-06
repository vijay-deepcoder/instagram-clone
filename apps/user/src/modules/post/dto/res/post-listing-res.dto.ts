import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationResDto } from '@shareable/dto';
import { PostResDto } from './post-res.dto';

export class PostListingResDto {
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
