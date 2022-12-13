import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from 'src/entity/Balance.entity';
import { BalanceStatus } from 'src/entity/enum/BalanceStatus.enum';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';


@Injectable()
export class RabbitService {
    constructor(
        private readonly productService: ProductService,
        @InjectRepository(Balance)
        private balanceRepository: Repository<Balance>,

    ) { }

    @RabbitSubscribe({
        errorHandler: (channel, message) => {
            channel.nack(message, false, false);
        },
        queue: 'Iot-queue',
    })
    public async pubSubHandler(msg): Promise<void> {

        Logger.log(`Received message: ${JSON.stringify(msg.weight)}`);

        let balances: Balance[] = await this.balanceRepository.find()
        // Get the most recent updatedAt balance
        let balance: Balance = balances.reduce((prev, current) => (prev.updatedAt > current.updatedAt) ? prev : current)

        this.productService.getStatus(msg.weight, balance.id)
    }
}