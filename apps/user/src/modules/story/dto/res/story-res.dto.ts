import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { StoryStatusEnum } from '@core/enum';
import { MusicResDto } from './music-res.dto';

export class StoryResDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  url: string;

  @Expose()
  @ApiProperty()
  status: StoryStatusEnum;

  @Expose()
  @ApiProperty({
    type: [MusicResDto],
  })
  @Type(() => MusicResDto)
  music: MusicResDto;
}
