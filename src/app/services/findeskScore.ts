import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FindeksScore } from '../models/Entity/findeskScore';
import { baseResponseModel } from '../models/responeModel/baseResponeModel';
import { itemResponseModel } from '../models/responeModel/itemResponseModel';
import { ListResponseModel } from '../models/responeModel/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FindeksScoreService {

  apiUrl = 'https://localhost:44350/api/';
  constructor(private httpClient: HttpClient) {}

  getById(id: number): Observable<itemResponseModel<FindeksScore>> {
    let newPath = this.apiUrl + 'findeksscores/getbyid?id='+id;
    return this.httpClient.get<itemResponseModel<FindeksScore>>(newPath);
  }

  getByCustomerId(customerId:number) : Observable<itemResponseModel<FindeksScore>>{
    let newPath = this.apiUrl + "findeksscores/getbycustomerid?customerid="+customerId
    return this.httpClient.get<itemResponseModel<FindeksScore>>(newPath);
  }

  getAll() : Observable<ListResponseModel<FindeksScore>>{
    let newPath = this.apiUrl + "findeksscores/getall"
    return this.httpClient.get<ListResponseModel<FindeksScore>>(newPath);
  }

  add(findeksScore:FindeksScore):Observable<baseResponseModel>{
    return this.httpClient.post<baseResponseModel>(this.apiUrl+"findeksscores/add",findeksScore)
  }

  delete(findeksScore:FindeksScore):Observable<baseResponseModel>{
    return this.httpClient.post<baseResponseModel>(this.apiUrl+"findeksscores/add",findeksScore)
  }

  update(findeksScore:FindeksScore):Observable<baseResponseModel>{
    return this.httpClient.post<baseResponseModel>(this.apiUrl+"findeksscores/add",findeksScore)
  }

}
