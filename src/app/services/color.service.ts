import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/Entity/color';
import { baseResponseModel } from '../models/responeModel/baseResponeModel';
import { itemResponseModel } from '../models/responeModel/itemResponseModel';
import { ListResponseModel } from '../models/responeModel/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  api:string = "https://localhost:5001/api/Color/";

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<Color>> {
    let newPath = this.api + "GetAll";
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  add(color:Color):Observable<baseResponseModel>{

    let newPath = this.api + 'Add'
    return this.httpClient.post<baseResponseModel>(newPath,color);
  }

  GetById(colorId:number):Observable<itemResponseModel<Color>>{
    let newPath = this.api + `GetById?id=${colorId}`;
    return this.httpClient.get<itemResponseModel<Color>>(newPath)
  }

  Update(color:Color):Observable<baseResponseModel>{
    let newPath = this.api + "Update"
    return this.httpClient.post<baseResponseModel>(newPath,{colorId:parseInt(color.colorId.toString()),colorName:color.colorName})
  }

}
