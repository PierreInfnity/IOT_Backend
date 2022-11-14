import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Basket } from 'src/entity/Basket.entity';
import { User } from 'src/entity/User.entity';
import { Cart } from 'src/entity/Cart.entity';

@Injectable()
export class BasketService {
    constructor(
        @InjectRepository(Basket)
        private basketsRepository: Repository<Basket>,

        @InjectRepository(User)
        private usersRepository: Repository<User>,

        @InjectRepository(Cart)
        private cartsRepository: Repository<Cart>,
    ) { }

    async reservation(userId: string) {
        const basket = new Basket();
        var user2 = await this.usersRepository.findOneBy({ id: userId });
        basket.user = user2;
        return this.basketsRepository.save(basket);
    }

    async reservationWithCartId(userId: string, shoppingCartId: string) {
        const basket = new Basket();
        var user2 = await this.usersRepository.findOneBy({ id: userId });
        var cart2 = await this.cartsRepository.findOneBy({ id: shoppingCartId });
        basket.user = user2;
        basket.cart = cart2;
        return this.basketsRepository.save(basket);
    }

    async getAllBaskets() {
        const basket = this.basketsRepository.find({
            relations: ['user', 'cart'],
        });
        return basket;
    }
}
