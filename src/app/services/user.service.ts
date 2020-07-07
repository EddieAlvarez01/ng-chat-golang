import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/User';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';
import { config } from '../config';
import { environment } from 'src/environments/environment';
import { Message } from '../models/Message';

@Injectable()
export class UserService {

  socket: any;

  constructor(
    private http: HttpClient
  ) { }

  //CONECTARSE AL SOCKET
  connectSocket(): void{
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  //ENTRAR COMO INVITADO
  enterAsGuest(username: string): Observable<any>{
    return this.http.post(config.url + 'user/create-guest', {username});
  }

  //TRAER ID DEL SOCKET DE UN USER
  getIdSocket(): Observable<any>{
    return new Observable((suscriber) => {
      this.socket.on('connected', (id: string) => {
        suscriber.next(id);
      });
    });
  }

  //MESNAJES DEL CHAT GENERAL
  getMessagesGeneral(): Observable<any>{
    return new Observable((suscriber) => {
      this.socket.on('message-general', (data: Object) => {
        suscriber.next(data);
      });
    });
  }

  //CHATEAR EN GENERAL(SALA)
  sendMessageGeneral(message: string, username: string, socketId: string): void{
    this.socket.emit('message-general', {message: message, sender: username, socketId: socketId});
  }

  //DESCONECTARSE
  closeConnection(): void{
    this.socket.emit('disconnect');
  }
}
