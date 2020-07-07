import { Component, OnInit, DoCheck } from '@angular/core';
import * as io from 'socket.io-client'
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http' 
import { User } from './models/User';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck{

  title = 'ng-chat-golang';
  socket: any;

  user: User;
  flag: number = 0;
  username: string = '';

  constructor(
    private http: HttpClient,
    private _userService: UserService
  ){}

  ngOnInit(){
    this.user = this.getUser();
  }

  //VERIFICA EL ESTADO DE LA SESSION
  ngDoCheck(){
    this.user = this.getUser();
  }

  //TRAE EL USUARIO DEL LOCAL STORAGE
  getUser(): User{
    return JSON.parse(localStorage.getItem("user"))
  }

  //CAMBIA LA BANDERA Y MUESTRA EL FORM DE ENTRAR COMO INVITADO
  showInvite(): void{
    this.flag = 1;
  }

  //MUESTRA EL FORM DE LOGIN
  showLogin(): void{
    this.flag = 2;
  }

  //MUESTRA DE NUEVO LOS BOTONES DE MENU
  showButtons(): void{
    this.flag = 0;
  }

  //ENTRAR COMO INVITADO
  loginGuest(): any{
    console.log('hola mundo');
    if(this.username != ''){
      this._userService.enterAsGuest(this.username).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  print(){
    /*this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on("message-general", (data: Object) => {
      console.log(data)
    });*/
  }
}
