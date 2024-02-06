import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StoryService } from './story.service';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from '@core/response.interceptor';
import { User } from '../../decoraters/user.decorator';
import { UserEntity } from '@shareable/database/entities';
import { UserGuard } from '../../gaurds/user.guard';
import { StoryCreateReqDto } from './dto/req/story-create-req.dto';
import { StoryResDto } from './dto/res/story-res.dto';
import { EmptyResDto } from '@shareable/dto';
import { StoryListingReqDto } from './dto/req/story-listing-req.dto';

@Controller('story')
@ApiTags('Story')
@ApiNotFoundResponse({ description: 'Story not found' })
@ApiBearerAuth()
@UseGuards(UserGuard)
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post()
  @ApiOkResponse({
    type: StoryResDto,
  })
  @Response(StoryResDto)
  create(@Body() body: StoryCreateReqDto, @User() user: UserEntity) {
    return this.storyService.create(body, user);
  }

  @Get(':id')
  @ApiOkResponse({
    type: StoryResDto,
  })
  @Response(StoryResDto)
  findOne(@Param('id') id: string) {
    return this.storyService.findOne(+id);
  }

  @Get()
  @ApiOkResponse({
    type: StoryResDto,
  })
  @Response(StoryResDto)
  findAll(@Query() query: StoryListingReqDto) {
    return this.storyService.findAll(query);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: EmptyResDto,
  })
  @Response(EmptyResDto)
  remove(@Param('id') id: string) {
    return this.storyService.remove(+id);
  }
}
