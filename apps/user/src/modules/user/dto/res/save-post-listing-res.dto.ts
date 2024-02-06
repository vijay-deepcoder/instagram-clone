import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationResDto } from '@shareable/dto';
import { SavePostResDto } from './save-post-res.dto';

export class SavePostListingResDto {
  @Expose()
  @ApiProperty({
    type: [SavePostResDto],
  })
  @Type(() => SavePostResDto)
  items: SavePostResDto[];

  @Expose()
  @ApiProperty({
    type: PaginationResDto,
  })
  @Type(() => PaginationResDto)
  pagination: PaginationResDto;
}
