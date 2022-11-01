import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketService } from 'src/basket/basket.service';
import { Cart } from 'src/entity/Cart.entity';
import QRCode from 'qrcode'
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

        const basket = await this.basketService.reservationWithCartId(userId, shoppingCartId);

        // Assign basket to cart

        cartToUpdate.basket = basket;

        
        await this.cartsRepository.save(cartToUpdate);
    }

    async getQRcode(cartId: number) {
        let data = {
            id: cartId
        }
        let stringdata = JSON.stringify(data)


        QRCode.toString(stringdata,{type:'terminal'},
                    function (err, QRcode) {
                        
            if(err) return console.log("Error occured while generating QR code");
        
            // Printing the generated code
            console.log(QRcode)
        })  
    }

    // Create basket
    createCart () {
        const cart = new Cart();
        cart.reserved = false
        return this.cartsRepository.save(cart);
    }    
}
