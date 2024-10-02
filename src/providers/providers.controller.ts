import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { userData } from 'src/auth/decoratos/user.decorator';
import { User } from 'src/auth/entities/user.entity';

@UseGuards(AuthGuard)	
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Get()
  findAll(@userData() user: User) {
    // console.log(user);
    if (user.userRoles.includes("Employee")) {
      throw new UnauthorizedException("No estas autorizado, solo admins");
    }
    return this.providersService.findAll();
  }
  @Get('/name/:name')
  findOneByName(@Param('name') name: string) {
    return this.providersService.findOneByName(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const provider = this.providersService.findOne(id);
    if (!provider) throw new NotFoundException(`Provider with id: ${id} not found`);
    return provider;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(id);
  }
}
