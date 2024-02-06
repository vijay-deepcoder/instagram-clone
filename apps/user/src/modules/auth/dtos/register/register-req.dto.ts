import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, NotContains } from 'class-validator';
import { IsNotBlank } from '@core/decorators/is-not-blank.decorator';

export class RegisterReqDto {
  @ApiProperty({
    example: 'Vijay Patel',
  })
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  name: string;

  @ApiProperty({
    example: 'vijay_patel',
  })
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  @NotContains(' ', { message: 'You can not set spaces in the username' })
  username: string;

  @ApiProperty({
    example: 'vijay@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  password: string;
}
