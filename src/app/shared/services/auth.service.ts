import { Injectable } from '@angular/core';
import { User } from '../module/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public validateUser(user:User): boolean{
    if(user.userName == environment.admin_username && user.password == environment.admin_password){
      return true;
    }else{
      return false;
    }
  }
}
