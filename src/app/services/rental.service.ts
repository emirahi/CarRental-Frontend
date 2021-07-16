import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responeModel/listResponseModel';
import { RentalDto } from '../models/Dto/rentadto';
import { itemResponseModel } from '../models/responeModel/itemResponseModel';
import { Rental } from '../models/Entity/rental';
import { baseResponseModel } from '../models/responeModel/baseResponeModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  api = "https://localhost:5001/api/Rental/";

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<RentalDto>>{
    let newPath = this.api + "GetAllRentalOfCars"
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath);
  }

  getByCarId(carId:number):Observable<itemResponseModel<RentalDto>>{
    let newPath = this.api + `GetByCarId?id=${carId}`;
    return this.httpClient.get<itemResponseModel<RentalDto>>(newPath);
  }

  add(rental:Rental) {
    let newPath = this.api + 'Add'
    console.log(newPath);
    console.log(rental);

    this.httpClient.post<baseResponseModel>(newPath,rental);
  }

}


