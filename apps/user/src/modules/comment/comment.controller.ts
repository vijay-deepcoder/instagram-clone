import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/req/create-comment.dto';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserGuard } from '../../gaurds/user.guard';
import { User } from '../../decoraters/user.decorator';
import { UserEntity } from '@shareable/database/entities';
import { Response } from '@core/response.interceptor';
import { CommentResDto } from './dto/res/comment-res.dto';
import { EmptyResDto } from '@shareable/dto';

@Controller('comment')
@ApiTags('Comment')
@ApiNotFoundResponse({ description: 'Comment not found' })
@ApiBearerAuth()
@UseGuards(UserGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOkResponse({
    type: CommentResDto,
  })
  @Response(CommentResDto)
  create(@User() user: UserEntity, @Body() body: CreateCommentDto) {
    return this.commentService.create(user, body);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: EmptyResDto,
  })
  @Response(EmptyResDto)
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
