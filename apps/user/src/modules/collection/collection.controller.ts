import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/req/create-collection.dto';
import { UpdateCollectionDto } from './dto/req/update-collection.dto';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserGuard } from '../../gaurds/user.guard';
import { Response } from '@core/response.interceptor';
import { UserEntity } from '@shareable/database/entities';
import { User } from '../../decoraters/user.decorator';
import { CollectionResDto } from './dto/res/collection-res.dto';
import { EmptyResDto } from '@shareable/dto';

@Controller('collection')
@ApiTags('Collection')
@ApiNotFoundResponse({ description: 'Collection not found' })
@ApiBearerAuth()
@UseGuards(UserGuard)
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  @ApiOkResponse({
    type: CollectionResDto,
  })
  @Response(CollectionResDto)
  create(@Body() body: CreateCollectionDto, @User() user: UserEntity) {
    return this.collectionService.create(body, user);
  }

  @Get()
  @ApiOkResponse({
    type: CollectionResDto,
  })
  @Response(CollectionResDto)
  findAll() {
    return this.collectionService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: CollectionResDto,
  })
  @Response(CollectionResDto)
  findOne(@Param('id') id: string) {
    return this.collectionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: CollectionResDto,
  })
  @Response(CollectionResDto)
  update(@Param('id') id: string, @Body() body: UpdateCollectionDto) {
    return this.collectionService.update(+id, body);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: EmptyResDto,
  })
  @Response(EmptyResDto)
  remove(@Param('id') id: string) {
    return this.collectionService.remove(+id);
  }
}
