import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TagsResDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;
}
