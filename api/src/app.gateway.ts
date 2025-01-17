import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: ['http://localhost:3000'] },
  transports: ['websocket'],
})
export class AppGateway {
  private readonly logger = new Logger(AppGateway.name);

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() socket: Socket, @MessageBody() data: unknown) {
    this.logger.log('websocket received: ping', data);
    socket.emit('pong');
  }
}
