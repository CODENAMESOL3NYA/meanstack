import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ProviderClass } from '../models/providers.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  //URL Endpoint to our Express App
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  //GET all records
  getProviders(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  //Get provider by id
  getProviderById(id:string|undefined):Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);

  }

  //Insert a record
  addProvider(data:ProviderClass):Observable<any>{
    return this.http.post(this.apiUrl,data)
  }

  //Update a record
  updateProvider(id:string|undefined,data:ProviderClass):Observable<ProviderClass>{
    return this.http.put<ProviderClass>(`${this.apiUrl}/${id}`,data);
  }

  deleteProvider(id:string|undefined):Observable<any>{
    return this.http.delete(`${environment.apiUrl}/${id}`);
  }
}
