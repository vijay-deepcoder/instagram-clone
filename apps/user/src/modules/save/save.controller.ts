import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SaveService } from './save.service';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserGuard } from '../../gaurds/user.guard';
import { EmptyResDto } from '@shareable/dto';
import { Response } from '@core/response.interceptor';
import { User } from '../../decoraters/user.decorator';
import { UserEntity } from '@shareable/database/entities';
import { PostSaveUnSaveReqDto } from './dto/req/post-save-unsave-req.dto';

@Controller('save')
@ApiTags('Save')
@ApiNotFoundResponse({ description: 'Save not found' })
@ApiBearerAuth()
@UseGuards(UserGuard)
export class SaveController {
  constructor(private readonly saveService: SaveService) {}

  @Post('postSaveUnSave')
  @ApiOkResponse({
    type: EmptyResDto,
  })
  @Response(EmptyResDto)
  postSaveUnSave(@User() user: UserEntity, @Body() body: PostSaveUnSaveReqDto) {
    return this.saveService.postSaveUnSave(user, body);
  }

  // @Post('storySaveUnSave')
  // @ApiOkResponse({
  //   type: EmptyResDto,
  // })
  // @Response(EmptyResDto)
  // storySaveUnSave(
  //   @User() user: UserEntity,
  //   @Body() body: PostSaveUnSaveReqDto,
  // ) {
  //   return this.saveService.storySaveUnSave(user, body);
  // }
}
