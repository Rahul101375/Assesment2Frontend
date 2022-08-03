import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl="http://localhost:5000"
  constructor(private http:HttpClient) { }
  getMethod(){
    return this.http.get(this.baseUrl);
  }
  postMethod(body:any){
    return this.http.post(this.baseUrl,body);
  }
  putMethod(id:any,body:any){
    return this.http.put(this.baseUrl+`/${id}`,body);
  }
  deleteMethod(id:any){
    return this.http.delete(this.baseUrl+`/${id}`)
  }
}
