import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from 'src/entity/Balance.entity';
import { ProductModule } from 'src/product/product.module';
import { RabbitController } from './rabbit.controller';
import { RabbitService } from './rabbit.service';

const rabbitMqUri = 'amqp://rabbitmqBackendIot';

@Module({
    imports: [TypeOrmModule.forFeature([Balance]),
    RabbitMQModule.forRoot(RabbitMQModule, {
        prefetchCount: 1,
        uri: rabbitMqUri,
    }),
        ProductModule],
    providers: [RabbitService],
    controllers: [RabbitController],
    exports: [RabbitService]
})
export class RabbitModule { }
