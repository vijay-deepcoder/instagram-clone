import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsNotBlank } from '@core/decorators/is-not-blank.decorator';

export class CreateCommentDto {
  @ApiProperty({
    example: 'Just looking like a wow',
  })
  @IsString()
  @IsNotEmpty()
  @IsNotBlank()
  content: string;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  postId: number;
}
