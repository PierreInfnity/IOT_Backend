import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';

@Controller('shopping-cart')
export class ShoppingCartController {
    constructor(private readonly shoppingCartService: ShoppingCartService) { }

    @Put("/assign-cart/:userId/:shoppingCartId")
    assignCartToUser(@Param("userId") userId: string, @Param("shoppingCartId") shoppingCartId: string) {
        return this.shoppingCartService.assignCartToUser(userId, shoppingCartId);
    }

    @Get("/get-qrcode/:cartId")
    getQRcode(@Param("cartId") cartId: string) {
        return this.shoppingCartService.getQRcode(cartId);
    }

    @Post("")
    createCart() {
        return this.shoppingCartService.createCart();
    }

    @Get()
    findAll() {
        return this.shoppingCartService.getAllCarts();
    }
}
