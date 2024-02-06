import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  NotContains,
} from 'class-validator';
import { IsNotBlank } from '@core/decorators/is-not-blank.decorator';
import { TypeEnum } from '@core/enum';

export class UpdateUserDto {
  @ApiProperty({
    example: 'Vijay Patel',
  })
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: 'vijay_patel',
  })
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  @IsOptional()
  @NotContains(' ', { message: 'You can not set spaces in the username' })
  username: string;

  @ApiProperty({
    example:
      '😎 Sharif Bacha 🚫' +
      '🎉 Wish Me 🍰 11 Jun🎉' +
      '🍴Foody🍴' +
      '😎Champion🏆' +
      '😊 Focus On Future 😃',
  })
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  @IsOptional()
  @MaxLength(200)
  bio: string;

  @ApiProperty({
    example: 'https://www.example.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  @IsOptional()
  websiteUrl: string;

  @IsEnum(TypeEnum, { message: 'Type is require' })
  @IsOptional()
  @IsNotEmpty({ message: 'Type should not be empty' })
  @ApiProperty({
    enum: TypeEnum,
    example: TypeEnum.public,
  })
  type: TypeEnum;
}
