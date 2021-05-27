import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { brandResonseModel } from '../models/responeModel/brandResponeModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  api = "https://localhost:44350/api/Brand/";

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<brandResonseModel> {
    this.api += "GetAll";
    return this.httpClient.get<brandResonseModel>(this.api);

  }
}
