import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responeModel/listResponseModel';
import { Brand } from '../models/Entity/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  api = "https://localhost:5001/api/Brand/";

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<Brand>> {
    let newPath = this.api + "GetAll";
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);

  }
}
