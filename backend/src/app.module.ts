import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartController } from './shopping-cart/shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { BasketController } from './basket/basket.controller';
import { BasketModule } from './basket/basket.module';
import { Basket } from './entity/Basket.entity';
import { Cart } from './entity/Cart.entity';
import { User } from './entity/User.entity';
import { UserModule } from './user/user.module';


@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: async () => ({
      type: 'mysql',
      host: "database",
      username: "user",
      password: "password",
      database: "db",
      entities: [Basket, Cart, User],
      port: 3306,
      autoLoadEntities: true,
      synchronize: true
    })
  }), ShoppingCartModule, BasketModule, UserModule, TypeOrmModule.forFeature([Basket, User, Cart])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
