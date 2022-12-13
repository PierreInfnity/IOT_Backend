import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { RabbitController } from './rabbit.controller';
import { RabbitService } from './rabbit.service';

const rabbitMqUri = 'amqp://rabbitmqBackendIot';

@Module({
    imports: [RabbitMQModule.forRoot(RabbitMQModule, {
        prefetchCount: 1,
        uri: rabbitMqUri,
    }),],
    providers: [RabbitService],
    controllers: [RabbitController],
    exports: [RabbitService]
})
export class RabbitModule { }
