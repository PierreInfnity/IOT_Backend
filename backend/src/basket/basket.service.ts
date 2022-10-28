import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Basket } from 'src/entity/Basket.entity';
import { User } from 'src/entity/User.entity';

@Injectable()
export class BasketService {
    constructor(
        @InjectRepository(Basket)
        private basketsRepository: Repository<Basket>,
        
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async createBasketForUser(userId: number) {
        const basket = new Basket();
        var user2  = await this.usersRepository.findOneBy({ id: userId });
        basket.user = user2;
        return this.basketsRepository.save(basket);
    }
}
