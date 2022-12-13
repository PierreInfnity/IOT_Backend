import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';


@Injectable()
export class RabbitService {
    constructor(
    ) { }

    @RabbitSubscribe({
        errorHandler: (channel, message) => {
            channel.nack(message, false, false);
        },
        queue: 'Iot-queue',
    })
    public async pubSubHandler(msg): Promise<void> {
        Logger.log(`Received message: ${JSON.stringify(msg)}`);
    }
}