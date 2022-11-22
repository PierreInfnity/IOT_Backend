import { Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/decorators/roles.enum';
import { Cart } from 'src/entity/Cart.entity';
import { ShoppingCartService } from './shopping-cart.service';

@Controller('shopping-cart')
export class ShoppingCartController {
    constructor(private readonly shoppingCartService: ShoppingCartService) { }

    @Put("/assign-cart/:shoppingCartId")
    @Roles(Role.User)
    assignCartToUser(@Req() req, @Param("shoppingCartId") shoppingCartId: string) {
        return this.shoppingCartService.assignCartToUser(req.jwtDatas.user_id, shoppingCartId);
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

    @Get("findReserved")
    @Roles(Role.User)
    isCartReserved(@Req() req): Promise<Cart> {
        return this.shoppingCartService.isCartReserved(req.jwtDatas.user_id);
    }
}
