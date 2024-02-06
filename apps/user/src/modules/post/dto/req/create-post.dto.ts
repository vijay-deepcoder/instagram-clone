import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsNotBlank } from '@core/decorators/is-not-blank.decorator';
import { PostTypeEnum } from '@core/enum';

export class CreatePostDto {
  @ApiProperty({
    example: 'https://www.example.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  url: string;

  @ApiProperty({
    example: 'The Vibe is this',
  })
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  @IsOptional()
  description: string;

  @ApiProperty({
    example: 'Beach,goa',
  })
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  @IsOptional()
  location: string;

  @IsEnum(PostTypeEnum, { message: 'Type is require' })
  @IsOptional()
  @IsNotEmpty({ message: 'Type should not be empty' })
  @ApiProperty({
    enum: PostTypeEnum,
    example: PostTypeEnum.post,
  })
  type: PostTypeEnum;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  musicId: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  tagId?: number;
}
