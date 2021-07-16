import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responeModel/listResponseModel';
import { CarDto } from '../models/Dto/cardto';
import { Car } from '../models/Entity/car';
import { CarDetailDto } from '../models/Dto/carDetailDto';
import { itemResponseModel } from '../models/responeModel/itemResponseModel';
import { baseResponseModel } from '../models/responeModel/baseResponeModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  api = "https://localhost:5001/api/Cars/";

  constructor(private httpClient: HttpClient) { }

  getAllCar(): Observable<ListResponseModel<Car>> {
    let newPath = this.api + "GetAll";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getAllCarDto(): Observable<ListResponseModel<CarDto>> {
    let newPath = this.api + "GetAllDto";
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);

  }

  getCarByBrand(brandId: number): Observable<ListResponseModel<CarDto>> {
    let newPath = this.api + "GetByBrandId?brandId=" + brandId
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarByColor(colorId: number): Observable<ListResponseModel<CarDto>> {
    let newPath = this.api + "GetByColorId?colorId=" + colorId
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getSearch(brandId: number, colorId: number): Observable<ListResponseModel<CarDto>> {
    // https://localhost:44350/api/Cars/GetSearchList?brandId=4&colorId=1
    let newPath = this.api + `GetSearchList?brandId=${brandId}&colorId=${colorId}`;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarDetails(carId:number):Observable<itemResponseModel<CarDetailDto>> {
    let newPath = this.api + `GetCarDetails?carId=${ carId }`;
    return this.httpClient.get<itemResponseModel<CarDetailDto>>(newPath);
  }

  Add(car:Car):Observable<baseResponseModel>{
    let newPath = this.api + "Add";
    return this.httpClient.post<baseResponseModel>(newPath,car);
  }

  Update(car:Car):Observable<baseResponseModel>{
    let newPath = this.api + "Update";
    console.log(car);
    return this.httpClient.post<baseResponseModel>(newPath,car);
  }
}

