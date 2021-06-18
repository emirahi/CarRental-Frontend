import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/Entity/color';
import { ListResponseModel } from '../models/responeModel/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  api:string = "https://localhost:44350/api/Color/";

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<Color>> {
    let newPath = this.api + "GetAll";
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

}
