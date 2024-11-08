import { Injectable, NotFoundException} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto);
    return product;
  }

  findAll() {
    return this.productRepository.find({
      relations:{
        provider: true
      }
    });
  }

   async findOne(id: string) {
    const  product  = await this.productRepository.findOne({
      where: {
        productId: id
      },
      relations:{
        provider: true
      }
    });    

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  findByProvider(id: string) {
   return this.productRepository.findBy({
      provider:{
        providerId: id
      }
   })
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const protductUpd = await this.productRepository.preload({
      productId: id, 
      ...updateProductDto
    });
    if (!protductUpd) throw new NotFoundException('Product not found');
    this.productRepository.save(protductUpd);
    return protductUpd;
  }

   remove(id: string) {
   this.findOne(id); 
   this.productRepository.delete(id);

    return {
      message: `Producto con ${id} eliminado`,
    };
  }
}
