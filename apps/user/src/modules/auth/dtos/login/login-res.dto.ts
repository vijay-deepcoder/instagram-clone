import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class User {
  @Expose()
  @ApiProperty()
  id: string;

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
  profileImageUri: string | null;
}

export class LoginResDto {
  @Expose()
  @ApiProperty({
    type: User,
  })
  @Type(() => User)
  user: User;

  @Expose()
  @ApiProperty()
  token: string;
}
