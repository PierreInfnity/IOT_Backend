import { Module } from '@nestjs/common';
import { BasketService } from 'src/basket/basket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/entity/Cart.entity';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { Basket } from 'src/entity/Basket.entity';
import { User } from 'src/entity/User.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cart, Basket, User])],
    providers: [ShoppingCartService, BasketService],
    controllers: [ShoppingCartController],
    exports: [ShoppingCartService]
})
export class ShoppingCartModule {}
