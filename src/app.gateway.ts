import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Logger } from "@nestjs/common";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection {

  private _logger: Logger = new Logger("AppGateway");

  @WebSocketServer() private _wss: Server;

  get wss(): Server {
    return this._wss;
  }


  afterInit(server: Server) {
    this.logger.log("Init!");
    this.wss.emit("msgToClient", "Init!");
    this.FIELD_SIZE = 400;
  }

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Connected! ${client.id}`);
  }


  /**
   * logs disconnect
   * @param client
   */
  handleDisconnect(client: Socket) {
    this.logger.log(`Disconnected! ${client.id}`);
  }

}
