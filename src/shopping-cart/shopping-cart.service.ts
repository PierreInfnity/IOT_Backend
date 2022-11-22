import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketService } from 'src/basket/basket.service';
import { Cart } from 'src/entity/Cart.entity';
import * as QC from 'qrcode'
import { Repository } from 'typeorm';

@Injectable()
export class ShoppingCartService {
    constructor(
        @InjectRepository(Cart)
        private cartsRepository: Repository<Cart>,

        private basketService: BasketService,
    ) { }


    async isCartReserved(userId: string): Promise<Cart> {
        let basket = await this.basketService.findActiveBasketForUser(userId)
        if (basket) {
            return this.cartsRepository.findOne({ where: { basket: basket }, relations: ['basket'] })
        }
        return null

    }
    async assignCartToUser(userId: string, shoppingCartId: string) {

        // Modify reserved boolean in cart

        const cartToUpdate = await this.cartsRepository.findOneBy({
            id: shoppingCartId,
        })
        cartToUpdate.reserved = true;

        // Create basket

        const basket = await this.basketService.reservationWithCartId(userId, shoppingCartId);

        // Assign basket to cart

        cartToUpdate.basket = basket;


        let newCart: Cart = await this.cartsRepository.save(cartToUpdate);
        return this.cartsRepository.findOne({ where: { id: newCart.id }, relations: ['basket'] })

    }

    async getQRcode(cartId: string) {
        let data = {
            id: cartId
        }
        let stringdata = JSON.stringify(data)


        const qrcode = QC.create(stringdata)
        const qrcodeTostring = QC.toString(stringdata)
        console.log(qrcodeTostring)
        return QC.toString(stringdata, { type: 'utf8' })
    }

    // Create basket
    createCart() {
        const cart = new Cart();
        cart.reserved = false
        return this.cartsRepository.save(cart);
    }

    getAllCarts() {
        return this.cartsRepository.find({
            relations: ['basket'],
        });
    }

    async endReservation(id: string): Promise<Cart> {

        // Modify reserved boolean in cart

        const cartToUpdate = await this.cartsRepository.findOneBy({
            id: id,
        })
        cartToUpdate.reserved = false;
        cartToUpdate.basket = null;


        return await this.cartsRepository.save(cartToUpdate);
    }
}
