import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { carResponseModel } from '../models/responeModel/carResponseModel';
import { CarBrandResponseModel } from '../models/responeModel/carBrandResponseModel';
import { CarColorResponseModel } from '../models/responeModel/carColorResponseModel';
import { Observable } from 'rxjs';
import { CarDtoResponseModel } from '../models/responeModel/carDtoResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

   api = "https://localhost:44350/api/Cars/";

  constructor(private httpClient:HttpClient ) { }

  getAllCar():Observable<carResponseModel>{
    this.api += "GetAll";
    return this.httpClient.get<carResponseModel>(this.api);
  }

  getAllCarDto():Observable<CarDtoResponseModel> {
    this.api += "GetAllDto";
    return this.httpClient.get<CarDtoResponseModel>(this.api);

  }

  getCarByBrand(brandName:string):Observable<CarBrandResponseModel> {
    this.api += "GetByBrandName?brandName=" + brandName
    return this.httpClient.get<CarBrandResponseModel>(this.api);
  }

  getCarByColor(colorName:string):Observable<CarColorResponseModel> {
    this.api += "GetByColorName?colorName=" + colorName
    return this.httpClient.get<CarColorResponseModel>(this.api);
  }

}

