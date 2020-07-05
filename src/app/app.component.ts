import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client'
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http' 
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ng-chat-golang';
  socket: any;

  constructor(
    private http: HttpClient
  ){}

  ngOnInit(){
    this.print();
  }

  print(){
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on("message-general", (data: Object) => {
      console.log(data)
    });
  }

  sendMessage(): void{
    this.socket.emit("message-general", {username: "eddike", message: "hola"});
  }
}
