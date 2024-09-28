import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}

  create(createProviderDto: CreateProviderDto) {
    return this.providerRepository.save(createProviderDto);
  }

  findAll() {
    return this.providerRepository.find();
  }

  findOne(id: string
  ) {
    return this.providerRepository.findOneBy({
      providerId: id
    });
  }

  findOneByName(name: string) {
    return this.providerRepository.findOneBy({
      providerName: name
    }
  )};

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const productUpd = await this.providerRepository.preload({
      providerId: id,
      ...updateProviderDto
    })
    return this.providerRepository.save(productUpd);
  }

  remove(id: string) {
    this.providerRepository.delete({
      providerId: id
    });
    return `Privider with id: ${id} has been deleted`;
  }
}