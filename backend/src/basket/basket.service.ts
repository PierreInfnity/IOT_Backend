import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Basket } from 'src/entity/Basket.entity';

@Injectable()
export class BasketService {
    constructor(
        @InjectRepository(Basket)
        private basketsRepository: Repository<Basket>,
    ) {}

    createBasketForUser(userId: number) {
        return this.basketsRepository.save({ user: userId });
    }
}
