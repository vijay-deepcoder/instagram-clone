import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsNotBlank } from '@core/decorators/is-not-blank.decorator';

export class UpdateCollectionDto {
  @ApiProperty({
    example: 'Love',
  })
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  @IsOptional()
  name: string;
}
