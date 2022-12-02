import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect
} from '@nestjs/websockets';
import { forwardRef, Inject, Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

import { SocketService } from './socket/socket.service';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';

@WebSocketGateway(null, { transports: ['websocket'] })
export class AppGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private socketService: SocketService,
        private cartService: ShoppingCartService) { }
    @WebSocketServer()
    server: Server;
    client = null;
    private logger: Logger = new Logger('AppGateway');

    afterInit(server: Server) {
        this.logger.log('Init on server');
        this.socketService.socket = server;
        this.socketService.client = null;
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
        this.client = client;
        this.socketService.client = this.client;
    }
}
