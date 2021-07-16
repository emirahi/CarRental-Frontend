import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responeModel/listResponseModel';
import { Brand } from '../models/Entity/brand';
import { baseResponseModel } from '../models/responeModel/baseResponeModel';
import { itemResponseModel } from '../models/responeModel/itemResponseModel';

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

  Add(brand:Brand):Observable<baseResponseModel>{
    let newApi = this.api + "Add";
    return this.httpClient.post<baseResponseModel>(newApi,brand);
  }

  GetById(brandId:number):Observable<itemResponseModel<Brand>>{
    let newPath = this.api + `GetById?id=${brandId}`;
    return this.httpClient.get<itemResponseModel<Brand>>(newPath);
  }

  Update(brand:Brand):Observable<baseResponseModel>{
    let newPath = this.api + `Update`
    //number olan veriyi string yapıp sonra tekrardan number yapmamdaki sebeb api ile iletişimde string olarak gitmesidir.
    return this.httpClient.post<baseResponseModel>(newPath,{brandId:parseInt(brand.brandId.toString()),brandName:brand.brandName});
  }
}
