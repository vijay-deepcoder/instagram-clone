import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CollectionResDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  thumbnail: string;
}
