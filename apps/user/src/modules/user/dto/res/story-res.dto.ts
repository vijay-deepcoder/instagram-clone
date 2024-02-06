import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { MusicResDto } from '../../../story/dto/res/music-res.dto';

export class StoryResDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  url: string;

  @Expose()
  @ApiProperty({
    type: [MusicResDto],
  })
  @Type(() => MusicResDto)
  music: MusicResDto;

  @Expose()
  @ApiProperty()
  createdAt: string;
}
