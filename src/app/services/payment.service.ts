import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { card } from '../models/Entity/card';
import { baseResponseModel } from '../models/responeModel/baseResponeModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  api = "https://localhost:5001/api/Card";

  constructor(private httpClient:HttpClient) { }

  /* https://localhost:5001/api/Card/IsSuccessCard */

  IsSuccessCard(Card:card):Observable<baseResponseModel> {
    let newPath = this.api + "/IsSuccessCard";
    console.log(Card);
    
    return this.httpClient.post<baseResponseModel>(newPath,Card);
  }

}
