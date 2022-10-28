import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket } from 'src/entity/Basket.entity';
import { Cart } from 'src/entity/Cart.entity';
import { User } from 'src/entity/User.entity';
import { ShoppingCartService } from 'src/shopping-cart/shopping-cart.service';
import { UserService } from 'src/user/user.service';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';

@Module({
  imports: [TypeOrmModule.forFeature([Basket, User, Cart])],
  providers: [BasketService, ShoppingCartService, UserService],
  controllers: [BasketController],
  exports: [BasketService]
})
export class BasketModule {}
