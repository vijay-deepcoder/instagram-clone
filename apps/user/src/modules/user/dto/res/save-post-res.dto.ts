import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SavePostResDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  url: string;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  location: string;
}
