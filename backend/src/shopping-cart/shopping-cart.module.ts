import { Module } from '@nestjs/common';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';

@Module({})
export class ShoppingCartModule {
    providers: [ShoppingCartService]
    controllers: [ShoppingCartController]
    imports: []
    exports: [ShoppingCartService]
}
