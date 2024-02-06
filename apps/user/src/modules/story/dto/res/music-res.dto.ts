import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class MusicResDto {
  @Expose()
  @ApiProperty()
  url: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  artistName: string;

  @Expose()
  @ApiProperty()
  icon: string;
}
