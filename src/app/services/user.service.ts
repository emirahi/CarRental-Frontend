import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User  } from "src/app/models/Entity/user";
import { UserDto } from '../models/Dto/userDto';
import { baseResponseModel } from '../models/responeModel/baseResponeModel';
import { itemResponseModel } from '../models/responeModel/itemResponseModel';
import { ListResponseModel } from '../models/responeModel/listResponseModel';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  api = "https://localhost:5001/api/Users/"
  constructor(private httpService:HttpClient) { }

  delete(id:number):Observable<baseResponseModel>{
    let newPath = this.api + `delete?id=${id}`;
    return this.httpService.get<baseResponseModel>(newPath);
  }

  update(user:User):Observable<baseResponseModel> {
    let newPath = this.api + "update"
    return this.httpService.post<baseResponseModel>(newPath,user);
  }

  GetByMail(email:string):Observable<itemResponseModel<UserDto>>{
    let newPath = this.api + `GetByMail?email=${email}`;
    return this.httpService.get<itemResponseModel<UserDto>>(newPath);
  }

  GetAll():Observable<ListResponseModel<User>> {
    let newPath = this.api + "GetAll";
    return this.httpService.get<ListResponseModel<User>>(newPath);
  }

}
