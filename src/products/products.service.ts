import { Injectable, NotFoundException, Delete } from '@nestjs/common';
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
    return this.productRepository.find();
  }

   findOne(id: string) {
    const  product  =  this.productRepository.findOneBy({productId: id});    

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  findByProvider(id: string) {
    // const productsFound = this.products.filter((product) => product.provider === id);

    // if (productsFound.length === 0) throw new NotFoundException('Provider not found');

    // return productsFound;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    // let productToUpdate = this.findOne(id);
    // productToUpdate = {
    //   ...productToUpdate,
    //   ...updateProductDto
    // };
    // this.products = this.products.map((product) => {
    //   if (product.productId === id) {
    //     product = productToUpdate;
    //   }
    //   return product;
    // });
    // return productToUpdate;
  }

  remove(id: string) {
   const productDel = this.productRepository.delete(id);

    if (!productDel) throw new NotFoundException('Product not found');
    return productDel;
  }
}
