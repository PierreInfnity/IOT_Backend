import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/decorators/roles.enum';
import { Balance } from 'src/entity/Balance.entity';
import { AddProductDto } from './dto/add-product.dto';
import { BalanceDTO } from './dto/balance.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    @Roles(Role.Manager, Role.User)
    findAll() {
        return this.productService.getAllProducts();
    }

    @Get(":id")
    @Roles(Role.User, Role.Manager)
    reservation(@Param("id") id: string) {
        return this.productService.getOneProducts(id);
    }

    @Post()
    @Roles(Role.Manager)
    createProduct(@Body() addProductDto: AddProductDto) {
        return this.productService.create(addProductDto);
    }

    @Put(":id")
    @Roles(Role.Manager)
    updatePoduct(@Body() updateProductDto: UpdateProductDto, @Param("id") id: string) {
        return this.productService.update(id, updateProductDto);
    }

    @Post("balance/:id/:idBasket")
    createNewBalance(@Param("id") id: string, @Param("idBasket") idBasket: string): Promise<Balance> {
        console.log("ici")
        return this.productService.createBalance(id, idBasket);
    }

    @Post("status")
    getBalanceStatus(@Body() balanceDTO: BalanceDTO) {
        return this.productService.getStatus(balanceDTO.weight, balanceDTO.idBalance);
    }
}
