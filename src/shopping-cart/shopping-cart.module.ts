import { forwardRef, Module } from '@nestjs/common';
import { BasketService } from 'src/basket/basket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/entity/Cart.entity';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { Basket } from 'src/entity/Basket.entity';
import { User } from 'src/entity/User.entity';
import { BasketModule } from 'src/basket/basket.module';
import { ProductModule } from 'src/product/product.module';

@Module({
    imports: [TypeOrmModule.forFeature([Cart, Basket, User]), ProductModule, forwardRef(() => BasketModule)],
    providers: [ShoppingCartService],
    controllers: [ShoppingCartController],
    exports: [ShoppingCartService]
})
export class ShoppingCartModule { }
