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
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guards';
import { Product } from './entity/Product.entity';
import { ProductModule } from './product/product.module';
import { SocketModule } from './socket/socket.module';
import { AppGateway } from './app.gateway';
import { Balance } from './entity/Balance.entity';
import { Manager } from './entity/Manager.entity';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';


@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: async () => ({
      type: 'mysql',
      host: "database",
      username: "user",
      password: "password",
      database: "db",
      entities: [Basket, Cart, User, Product],
      port: 3306,
      autoLoadEntities: true,
      synchronize: true
    })
  }), AuthModule,
    ProductModule,
    ShoppingCartModule,
    BasketModule,
    UserModule,
    SocketModule,
  TypeOrmModule.forFeature([Basket, User, Cart, Product, Balance, Manager]),
  RabbitMQModule.forRoot(RabbitMQModule, {
    prefetchCount: 1,
    uri: "amqp://rabbitmqBackend",
  }),
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useExisting: AuthGuard
    },
    AuthGuard,
    AppGateway
  ],
})
export class AppModule { }
