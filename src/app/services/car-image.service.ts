import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/Entity/car-image';
import { ListResponseModel } from '../models/responeModel/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  api:string = "https://localhost:5001/api/CarImages/"
  returned:any = undefined;

  constructor(private httpClient:HttpClient) { }
  
  getCarById(carId:number):Observable<ListResponseModel<CarImage>> {
    let newPath = this.api + `getcarimages?carId=${carId}`;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }

}
