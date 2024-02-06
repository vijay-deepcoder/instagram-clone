import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsNotBlank } from '@core/decorators/is-not-blank.decorator';

export class UpdatePostDto {
  @ApiProperty({
    example: 'The Vibe is this',
  })
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  @IsOptional()
  description: string;
}
