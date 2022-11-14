import { Controller, Get, Param, Post } from '@nestjs/common';
import { BasketService } from './basket.service';

@Controller('basket')
export class BasketController {
    constructor(private readonly basketService: BasketService) { }

    @Post("reservation/:userId") // create a basket and assign it to a user
    reservation(@Param("userId") userId: string) {
        return this.basketService.reservation(userId);
    }

    @Post("reservation/:userId/:shoppingCartId") // create a basket and assign it to a user with a shoppingCartId
    reservationWithCartId(@Param("userId") userId: string, @Param("shoppingCartId") shoppingCartId: string) {
        return this.basketService.reservationWithCartId(userId, shoppingCartId);
    }

    @Get()
    findAll() {
        return this.basketService.getAllBaskets();
    }
}
