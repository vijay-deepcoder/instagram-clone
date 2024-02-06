import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsNotBlank } from '@core/decorators/is-not-blank.decorator';

export class CreateCollectionDto {
  @ApiProperty({
    example: 'Love',
  })
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  name: string;
}
