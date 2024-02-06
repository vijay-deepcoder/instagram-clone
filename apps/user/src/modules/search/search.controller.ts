import { Controller, Post, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from '@core/response.interceptor';
import { SearchListingReqDto } from './dto/req/search-listing.req.dto';
import { UserGuard } from '../../gaurds/user.guard';
import { SearchListingResDto } from './dto/res/search-listing-res.dto';

@Controller('search')
@ApiTags('Search')
@ApiNotFoundResponse({ description: 'Search not found' })
@ApiBearerAuth()
@UseGuards(UserGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  @ApiOkResponse({
    type: SearchListingResDto,
  })
  @Response(SearchListingResDto)
  search(@Query() query: SearchListingReqDto) {
    return this.searchService.search(query);
  }
}
