import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly getUserUrl = 'http://localhost:8080/users'
  private readonly delUserUrl = 'http://localhost:8080/users/'


  private users: Observable<User[]>
  
  private helper = new JwtHelperService();

  private user: Observable<User>

  constructor(private http: HttpClient,
        private router:Router) { }


  getUsers(): Observable<User[]>{
    console.log('Bearer ' + localStorage.getItem("jwt"))

    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      localStorage.removeItem("jwt")
    }
    

    if (localStorage.getItem("jwt") != null){ 
      this.users = this.http.get<User[]>(this.getUserUrl, {
        params:{},
        headers:{          
          'Authorization': 'Bearer ' + localStorage.getItem("jwt")
        }
      })
      return this.users
    }
    else return null  
  }


  deleteUser(id:number): Observable<User>{
    console.log(this.delUserUrl+id);
    
    this.user = this.http.delete<User>(this.delUserUrl+id, {
      params:{},
      headers:{          
        'Authorization': 'Bearer ' + localStorage.getItem("jwt")
      }
      
    })

    return this.user
    
  }

  newUser(user:User): Observable<User>{
    console.log(user);
    const body:string = "{ \"id\": 0 , \"firstName\":\"" + user.firstName+ "\", \"lastName\": \"" +user.lastName + "\" }"
    return this.http.post<User>(this.getUserUrl, body,
    {
      params:{
      },
      headers:{
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' + localStorage.getItem("jwt")

      }
     
    })
  }

  editUser(user:User): Observable<User>{
    console.log(user);
    const body:string = "{ \"id\": "+user.id+" , \"firstName\":\"" + user.firstName+ "\", \"lastName\": \"" +user.lastName + "\" }"
    return this.http.put<User>(this.getUserUrl, body,
    {
      params:{
      },
      headers:{
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer ' + localStorage.getItem("jwt")

      }
     
    })
  }



}
