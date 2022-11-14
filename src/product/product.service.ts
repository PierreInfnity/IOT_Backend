import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entity/Product.entity';
import { AddProductDto } from './dto/add-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,

    ) { }

    async getAllProducts() {
        const products: Product[] = await this.productRepository.find()
        return products;
    }

    async getOneProducts(id: string) {
        const products: Product = await this.productRepository.findOneBy({ id: id })
        return products;
    }

    async create(addProductDto: AddProductDto): Promise<Product> {
        const product: Product = Object.assign(addProductDto);
        return this.productRepository.save(product);
    }

    async update(id: string, UpdateProductDto: UpdateProductDto): Promise<Product> {
        const updateProduct: Product = Object.assign(UpdateProductDto);
        return this.productRepository.save({ id: id, ...updateProduct });
    }
}
