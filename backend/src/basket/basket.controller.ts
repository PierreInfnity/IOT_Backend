import { Controller, Param, Post } from '@nestjs/common';
import { BasketService } from './basket.service';

@Controller('basket')
export class BasketController {
    @Post(":userId") // create a basket and assign it to a user
    createBasketForUser(@Param("userId") userId: string) {
        return BasketService.createBasketForUser(userId);
    }
}
