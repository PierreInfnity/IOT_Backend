import { Controller, Param, Post } from '@nestjs/common';
import { BasketService } from './basket.service';

@Controller('basket')
export class BasketController {
    constructor (private readonly basketService: BasketService) {}

    @Post(":userId") // create a basket and assign it to a user
    createBasketForUser(@Param("userId") userId: number) {
        return this.basketService.createBasketForUser(userId);
    }
}
