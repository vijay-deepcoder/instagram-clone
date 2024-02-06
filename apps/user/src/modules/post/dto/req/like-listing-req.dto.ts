import { ApiPropertyOptional } from '@nestjs/swagger';
import { OrderByEnum } from '@shareable/enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationReqDto } from '@shareable/dto';

export class LikeListingReqDto extends PaginationReqDto {
  @ApiPropertyOptional({ enum: OrderByEnum, default: OrderByEnum.desc })
  @IsEnum(OrderByEnum)
  @IsOptional()
  readonly orderBy?: OrderByEnum = OrderByEnum.desc;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  search?: string;
}
