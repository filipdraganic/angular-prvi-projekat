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

  private user: User

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


  deleteUser(id:number): Boolean{

    this.http.delete(this.delUserUrl+id, {
      params:{},
      headers:{          
          'Authorization': 'Bearer ' + localStorage.getItem("jwt")
      }
      
    })

    return true
  }

  newUser(user:User){
    console.log(user);
    
    this.http.post(this.getUserUrl,{
      params:{
        id: 11,
        firstName: user.firstName,
        lastName: user.lastName
      },
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem("jwt")

      }
    })
  }



}
