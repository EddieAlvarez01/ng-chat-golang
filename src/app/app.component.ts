import { Component, OnInit, DoCheck } from '@angular/core';
import { User } from './models/User';
import { Message } from './models/Message';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck{

  title = 'ng-chat-golang';

  user: User;
  flag: number = 0;
  username: string = '';
  message: string = '';

  //ARRAY DE MENSAJES DEL CHAT GENERAL
  chatGeneral: Message[] = [];

  constructor(
    private _userService: UserService
  ){}

  ngOnInit(){
    this.user = this.getUser();
    if(this.user){
      this._userService.connectSocket();

      //INICIALIZAR LOS METODOS QUE ESCUCHAN EL SOCKET
      this.connected();
      this.generalMessages();
    }
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
    if(this.username != ''){
      this._userService.enterAsGuest(this.username).subscribe(
        res => {
          this.user = res
          localStorage.setItem("user", JSON.stringify(this.user));
          this._userService.connectSocket();  //INICIALIZAR SOCKET
          this.connected();
          this.generalMessages();
          this.flag = 0;
          this.username = '';
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  //CERRAR SESION
  logout(): void{
    localStorage.removeItem('user');
    this._userService.closeConnection();
  }

  //TRAE EL ID DEL SOCKET DEL USER
  connected(): void{
    this._userService.getIdSocket().subscribe((id: string) => {
      console.log(id);
      this.user.socketId = id;
      localStorage.setItem('user', JSON.stringify(this.user));
    });
  }

  //MENSAJES DE GENERAL
  generalMessages(): void{
    this._userService.getMessagesGeneral().subscribe((data: any) => {
      const message: Message = new Message(0, 0, 0, data.message, 1, '', null, {username: data.sender}, data.socketId);
      this.chatGeneral.push(message);
    });
  }

  //ENVIAR UN MENSAJE A GENERAL
  sendMessageGeneral(): void{
    if(this.message != ''){
      this._userService.sendMessageGeneral(this.message, this.user.username, this.user.socketId);
      this.message = '';
    }
  }

}
