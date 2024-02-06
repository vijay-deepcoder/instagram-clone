import { ApiPropertyOptional } from '@nestjs/swagger';
import { OrderByEnum } from '@shareable/enum';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationReqDto } from '@shareable/dto';
import { PostTypeEnum } from '@core/enum';

export class PostListingReqDto extends PaginationReqDto {
  @ApiPropertyOptional({ enum: OrderByEnum, default: OrderByEnum.desc })
  @IsEnum(OrderByEnum)
  @IsOptional()
  readonly orderBy?: OrderByEnum = OrderByEnum.desc;

  @ApiPropertyOptional({ enum: PostTypeEnum, default: PostTypeEnum.post })
  @IsEnum(PostTypeEnum)
  @IsOptional()
  readonly postType: PostTypeEnum = PostTypeEnum.post;
}
