import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsNotBlank } from '@core/decorators/is-not-blank.decorator';

export class StoryCreateReqDto {
  @ApiProperty({
    example: 'https://storyexample.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  url: string;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  musicId: number;
}
