import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationReqDto } from '@shareable/dto';

export class FollowListingReqDto extends PaginationReqDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  search?: string;
}
