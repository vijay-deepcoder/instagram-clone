import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationReqDto } from '@shareable/dto';

export class SearchListingReqDto extends PaginationReqDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  search?: string;
}
