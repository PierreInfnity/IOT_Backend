import { Controller, Get, Param, Put } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';

@Controller('shopping-cart')
export class ShoppingCartController {
    constructor (private readonly shoppingCartService: ShoppingCartService) {}

    @Put("/assign/:basketId/:userId") // create a basket and assign it to a user
    assignBasketToUser(@Param("basketId") basketId: string, @Param("userId") userId: string) {
        // return this.shoppingCartService.assignBasketToUser(basketId, userId);
    }
}
