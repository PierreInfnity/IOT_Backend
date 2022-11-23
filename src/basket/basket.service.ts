import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Basket } from 'src/entity/Basket.entity';
import { User } from 'src/entity/User.entity';
import { Cart } from 'src/entity/Cart.entity';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { Product } from 'src/entity/Product.entity';
import { ProductService } from 'src/product/product.service';
import { ShoppingCartService } from 'src/shopping-cart/shopping-cart.service';

@Injectable()
export class BasketService {
    constructor(
        @InjectRepository(Basket)
        private basketsRepository: Repository<Basket>,

        @InjectRepository(User)
        private usersRepository: Repository<User>,

        @InjectRepository(Cart)
        private cartsRepository: Repository<Cart>,

        private productService: ProductService,
        @Inject(forwardRef(() => ShoppingCartService))
        private shoppingCartService: ShoppingCartService
    ) { }

    async reservation(userId: string) {
        const basket = new Basket();
        var user2 = await this.usersRepository.findOneBy({ id: userId });
        basket.user = user2;
        return this.basketsRepository.save(basket);
    }

    async reservationWithCartId(userId: string, shoppingCartId: string) {
        console.log("ICI")
        var user2 = await this.usersRepository.findOneBy({ id: userId });
        var cart2 = await this.cartsRepository.findOneBy({ id: shoppingCartId });
        return this.basketsRepository.save({ user: user2, cart: cart2, active: true });
    }

    async getOne(id: string): Promise<Basket> {
        return this.basketsRepository.findOneBy({ id: id })
    }

    async addItem(updateBasketDto: UpdateBasketDto) {

        let basket: Basket = await this.basketsRepository.findOneBy({ id: updateBasketDto.idBasket })
        let product: Product = await this.productService.getOneProducts(updateBasketDto.idProduct)

        let productList: Product[] = basket.products
        productList.push(product)
        basket.products = productList

        return this.basketsRepository.save(basket);
    }

    async removeItem(updateBasketDto: UpdateBasketDto) {
        let basket: Basket = await this.basketsRepository.findOneBy({ id: updateBasketDto.idBasket })

        let productList: Product[] = []

        for (let i = 0; i < basket.products.length; i++) {
            if (basket.products[i].id != updateBasketDto.idProduct)
                productList.push(basket.products[i])
        }

        basket.products = productList
        return this.basketsRepository.save(basket);
    }


    async getAllBaskets() {
        const basket = this.basketsRepository.find({
            relations: ['user', 'cart'],
        });
        return basket;
    }

    async findActiveBasketForUser(id: string): Promise<Basket> {
        let user: User = await this.usersRepository.findOneBy({ id: id })
        const basket: Basket = await this.basketsRepository.findOne({ where: { user: user, active: true } });
        return basket;
    }

    async payBasket(id: string): Promise<Basket> {
        let basket: Basket = await this.basketsRepository.findOne({ where: { id: id } });
        await this.shoppingCartService.endReservation(basket.cart.id)
        basket.active = false;
        basket.paidAt = new Date(Date.now())
        basket.cart = null
        let totalCost = 0
        for (var i = 0; i < basket.products.length; i++) {
            totalCost += basket.products[i].price
        }
        basket.paid = totalCost
        return this.basketsRepository.save(basket);
    }

    async getHistory(id: string): Promise<Basket[]> {
        let user: User = await this.usersRepository.findOne({ where: { id: id } })
        let baskets: Basket[] = await this.basketsRepository.find({ where: { user: user, active: false } });
        return baskets
    }
}
