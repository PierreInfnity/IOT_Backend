import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketService } from 'src/basket/basket.service';
import { Cart } from 'src/entity/Cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShoppingCartService {
    constructor (
        @InjectRepository(Cart)
        private cartsRepository: Repository<Cart>,

        private basketService: BasketService,
    ) {}

    async assignCartToUser(userId: number, shoppingCartId: number) {
        // Modify reserved boolean in cart

        const cartToUpdate = await this.cartsRepository.findOneBy({
            id: shoppingCartId,
        })
        cartToUpdate.reserved = true;
        

        // Create basket

        const basket = await this.basketService.createBasketForUser(userId);

        // Assign basket to cart

        cartToUpdate.basket = basket;

        
        await this.cartsRepository.save(cartToUpdate);
    }
    
}
