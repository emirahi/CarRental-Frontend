import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { rentalResponeModel } from '../models/responeModel/rentalResponseModel';
import { rentalDtoResponeModel } from '../models/responeModel/rentalDtoResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  api = "https://localhost:44350/api/Rental/";

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<rentalDtoResponeModel>{
    this.api += "GetAllRentalOfCars"
    return this.httpClient.get<rentalDtoResponeModel>(this.api);
  }

}
