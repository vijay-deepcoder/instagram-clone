import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  username: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  profileImage: string;

  @Expose()
  @ApiProperty()
  bio: string;

  @Expose()
  @ApiProperty()
  websiteUrl: string;

  @Expose()
  @ApiProperty()
  type: string;
}

export class UserResDto {
  @Expose()
  @ApiProperty({
    type: UserDto,
  })
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  @ApiProperty()
  posts: number;

  @Expose()
  @ApiProperty()
  followers: number;

  @Expose()
  @ApiProperty()
  followings: number;
}
