import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  PostStudent(data : any){
    return this.http.post<any>("http://localhost:3000/posts",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  GetAllStudent(){
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  UpdateStudent(data :any, firstName: string){
    return this.http.put<any>("http://localhost:3000/posts"+firstName,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  DeleteStudent(firstName: string){
    return this.http.delete<any>("http://localhost:3000/posts"+ firstName)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
