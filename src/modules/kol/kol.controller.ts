import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { KolService } from './kol.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser, CognitoUser } from 'src/decorators/user.decorator';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateKolDto, DeleteKolDto, UpdateKolDto } from './kol.dto';
@Controller('kol')
@ApiTags('kol')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller()
export class KolController {
  constructor(private readonly kolService: KolService) {}

  @Get('')
  @ApiQuery({ name: 'sex', required: false })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'platform', required: false })
  getKols(
    @Query('sex') sex: string,
    @Query('name') name: string,
    @Query('platform') platform: string,
    @AuthUser() user: CognitoUser,
  ) {
    const query = {
      name,
      sex,
      platform,
    };
    return this.kolService.searchKol(query);
  }
  @Post('')
  createKol(@Body() createCatDto: CreateKolDto, @AuthUser() user: CognitoUser) {
    return this.kolService.createKol(createCatDto);
  }
  @Patch('/')
  updateKol(@Body() updateCatDto: UpdateKolDto, @AuthUser() user: CognitoUser) {
    return this.kolService.updateKol(updateCatDto);
  }
  @Delete('/:id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  deleteKol(@Param('id') id: string, @AuthUser() user: CognitoUser) {
    const deleteCatDto: DeleteKolDto = {
      id,
    };
    return this.kolService.deleteKol(deleteCatDto);
  }
}
