import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FollowResDto {
  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  username: string;

  @Expose()
  @ApiProperty()
  profileImage: string;
}
