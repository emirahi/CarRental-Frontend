
import { Injectable } from '@angular/core';
import { UserForLoginDto } from '../models/Dto/userForLoginDto';
import { Rental } from '../models/Entity/rental';
import { Token } from '../models/Entity/token';
import { User } from '../models/Entity/user';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  addToken(token:Token){
    localStorage.setItem("token",token.token);
    localStorage.setItem("expiration",token.expiration);
  }

  getToken(){
    return localStorage.getItem("token");
  }

  removeToken(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  addCurrentCustomer(user:UserForLoginDto){
    localStorage.setItem("currentUser",user.email);
  }

  removeCurrentCustomer(){
    localStorage.removeItem("currentUser");
  }

  addCurrentUserId(user:User){
    localStorage.setItem("currentUserId",user.id.toString());
  }

  getCurrentUserId(){
    return localStorage.getItem("currentUserId")
  }

  removeCurrentUserId(){
    localStorage.removeItem("currentUserId");
  }

  addRental(rentalModel:Rental){
    localStorage.setItem("rentalModel",JSON.stringify(rentalModel));
  }

  getRental(){
    var data = localStorage.getItem("rentalModel");
    if (data) {
        return JSON.parse(data)
    }
  }

  removeRental(){
    localStorage.removeItem("rentalModel");
  }

  getCurrentUser(){
    return localStorage.getItem("currentUser")
  }

}
