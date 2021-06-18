import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responeModel/listResponseModel';
import { RentalDto } from '../models/Dto/rentadto';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  api = "https://localhost:44350/api/Rental/";

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<RentalDto>>{
    let newPath = this.api + "GetAllRentalOfCars"
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath);
  }
}

