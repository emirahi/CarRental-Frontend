import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserForLoginDto } from '../models/Dto/userForLoginDto';
import { UserForRegisterDto } from '../models/Dto/userForRegisterDto';
import { Token } from '../models/Entity/token';
import { itemResponseModel } from '../models/responeModel/itemResponseModel';
import { LocalStorageService } from './localStorageHelper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = "https://localhost:5001/api/Auth/";
  constructor(private httpClient:HttpClient) { }
  
  register(user:UserForRegisterDto):Observable<itemResponseModel<Token>> {
    let newPath = this.api + "register";
    return this.httpClient.post<itemResponseModel<Token>>(newPath,user);
  }

  login(user:UserForLoginDto):Observable<itemResponseModel<Token>> {
    let newPath = this.api + 'login';
    return this.httpClient.post<itemResponseModel<Token>>(newPath,user);
  }

  isAuthenticated(){
    if (localStorage.getItem("token") && localStorage.getItem("expiration")) {
      return true;
    }
    return false;
  }
    

}
