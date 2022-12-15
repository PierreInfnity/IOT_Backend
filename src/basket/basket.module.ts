import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket } from 'src/entity/Basket.entity';
import { Cart } from 'src/entity/Cart.entity';
import { User } from 'src/entity/User.entity';
import { ProductModule } from 'src/product/product.module';
import { ShoppingCartModule } from 'src/shopping-cart/shopping-cart.module';
import { ShoppingCartService } from 'src/shopping-cart/shopping-cart.service';
import { UserService } from 'src/user/user.service';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';

@Module({
  imports: [TypeOrmModule.forFeature([Basket, User, Cart]),
  forwardRef(() => ShoppingCartModule),
    ProductModule,
  ],
  providers: [BasketService, UserService],
  controllers: [BasketController],
  exports: [BasketService]
})
export class BasketModule { }
