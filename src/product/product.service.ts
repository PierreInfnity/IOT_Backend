import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entity/Product.entity';
import { AddProductDto } from './dto/add-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { inspect } from 'util';
import { BalanceDTO } from './dto/balance.dto';
import { SocketService } from 'src/socket/socket.service';
import { Balance } from 'src/entity/Balance.entity';
import { BalanceStatus } from 'src/entity/enum/BalanceStatus.enum';
import { Basket } from 'src/entity/Basket.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Balance)
        private balanceRepository: Repository<Balance>,
        @InjectRepository(Basket)
        private basketRepository: Repository<Basket>,
        private readonly socketService: SocketService

    ) { }

    async getAllProducts() {
        const products: Product[] = await this.productRepository.find()
        return products;
    }

    async getOneProducts(id: string) {
        const products: Product = await this.productRepository.findOneBy({ id: id })
        return products;
    }

    async create(addProductDto: AddProductDto): Promise<Product> {
        const product: Product = Object.assign(addProductDto);
        return this.productRepository.save(product);
    }

    async update(id: string, UpdateProductDto: UpdateProductDto): Promise<Product> {
        let product = await this.productRepository.findOne({ where: { id: id } })
        let newProduct = Object.assign(UpdateProductDto);
        return this.productRepository.save({ id: id, ...product, ...newProduct });
    }

    async createBalance(id: string, idBasket: string): Promise<Balance> {
        let balances: Balance[] = await this.balanceRepository.find({ where: { status: BalanceStatus.ACCEPTED } })
        console.log(balances)
        balances = balances.filter(balance => balance.basket.id == idBasket)
        let basket: Basket = await this.basketRepository.findOne({ where: { id: idBasket } })

        if (balances.length == 0) {
            let newBalance = new Balance()
            newBalance.product = await this.productRepository.findOne({ where: { id: id } })
            newBalance.basket = basket
            newBalance.status = BalanceStatus.PENDING
            newBalance.precedentWeight = 0
            newBalance.updatedAt = new Date()
            return this.balanceRepository.save(newBalance)
        }

        let lastBalance = balances.reduce((prev, current) => (prev.updatedAt > current.updatedAt) ? prev : current)
        if (lastBalance) {
            let newBalance = new Balance()
            newBalance.product = await this.productRepository.findOne({ where: { id: id } })
            newBalance.basket = basket
            newBalance.status = BalanceStatus.PENDING
            newBalance.precedentWeight = lastBalance.finalWeight
            newBalance.updatedAt = new Date()
            return this.balanceRepository.save(newBalance)
        }

        let newBalance = new Balance()
        newBalance.product = await this.productRepository.findOne({ where: { id: id } })
        newBalance.basket = basket
        newBalance.status = BalanceStatus.PENDING
        newBalance.precedentWeight = 0
        newBalance.updatedAt = new Date()
        return this.balanceRepository.save(newBalance)
    }

    async getStatus(weight: number, idBalance: string): Promise<any> {


        let lastBalance: Balance = await this.balanceRepository.findOne({ where: { id: idBalance } })

        switch (lastBalance.status) {
            case "refused":
                lastBalance.status = BalanceStatus.PENDING
                lastBalance.precedentWeight = weight
                lastBalance.updatedAt = new Date()
                this.balanceRepository.save(lastBalance)
                this.socketService.client.send(JSON.stringify({ status: "pending" }))
                return
            default:
                if (lastBalance.precedentWeight + lastBalance.product.weight == weight) {
                    lastBalance.status = BalanceStatus.ACCEPTED
                    lastBalance.precedentWeight = weight
                    lastBalance.finalWeight = weight
                    lastBalance.updatedAt = new Date()
                    this.balanceRepository.save(lastBalance)
                    this.socketService.client.send(JSON.stringify({ status: "accepted" }))
                    return
                }
                lastBalance.status = BalanceStatus.REFUSED
                lastBalance.precedentWeight = weight
                lastBalance.updatedAt = new Date()
                this.balanceRepository.save(lastBalance)
                this.socketService.client.send(JSON.stringify({ status: "refused" }))
                return

        }
    }
}
