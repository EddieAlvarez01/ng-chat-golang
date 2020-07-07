import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { config } from '../config';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  //ENTRAR COMO INVITADO
  enterAsGuest(username: string): Observable<any>{
    return this.http.post(config.url + 'user/create-guest', {username});
  }

}
