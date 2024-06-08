import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  url="http://localhost:3000/post/"
  constructor(private http:HttpClient) { }
  get(){
    return this.http.get(this.url)
  }
  post(data:any){
    return this.http.post(this.url,data)
  }
  put(data:any,id:any){
    if(!id){
      return
    }
    console.log(this.url+id,data,"http")
    return this.http.put(this.url+id,data)
  }
  delete(id:any){
    return this.http.delete(this.url+id)
  }
}
