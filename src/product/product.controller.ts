import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/decorators/roles.enum';
import { AddProductDto } from './dto/add-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    findAll() {
        return this.productService.getAllProducts();
    }

    @Get(":id")
    @Roles(Role.User)
    reservation(@Param("id") id: string) {
        return this.productService.getOneProducts(id);
    }

    @Post()
    createProduct(@Body() addProductDto: AddProductDto) {
        return this.productService.create(addProductDto);
    }

    @Put(":id")
    updatePoduct(@Body() updateProductDto: UpdateProductDto, @Param("id") id: string) {
        return this.productService.update(id, updateProductDto);
    }
}
