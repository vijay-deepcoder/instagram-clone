import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationResDto } from '@shareable/dto';
import { CommentWithAuthorResDto } from './comment-with-author-res.dto';

export class CommentListingResDto {
  @Expose()
  @ApiProperty({
    type: [CommentWithAuthorResDto],
  })
  @Type(() => CommentWithAuthorResDto)
  items: CommentWithAuthorResDto[];

  @Expose()
  @ApiProperty({
    type: PaginationResDto,
  })
  @Type(() => PaginationResDto)
  pagination: PaginationResDto;
}
