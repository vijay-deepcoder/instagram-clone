import { ApiPropertyOptional } from '@nestjs/swagger';
import { OrderByEnum } from '@shareable/enum';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationReqDto } from '@shareable/dto';

export class CommentListingReqDto extends PaginationReqDto {
  @ApiPropertyOptional({ enum: OrderByEnum, default: OrderByEnum.desc })
  @IsEnum(OrderByEnum)
  @IsOptional()
  readonly orderBy?: OrderByEnum = OrderByEnum.desc;
}
