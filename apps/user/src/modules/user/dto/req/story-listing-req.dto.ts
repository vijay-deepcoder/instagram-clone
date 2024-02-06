import { PaginationReqDto } from '@shareable/dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { OrderByEnum } from '@shareable/enum';
import { IsEnum, IsOptional } from 'class-validator';

export class StoryListingReqDto extends PaginationReqDto {
  @ApiPropertyOptional({ enum: OrderByEnum, default: OrderByEnum.desc })
  @IsEnum(OrderByEnum)
  @IsOptional()
  readonly orderBy?: OrderByEnum = OrderByEnum.desc;
}
