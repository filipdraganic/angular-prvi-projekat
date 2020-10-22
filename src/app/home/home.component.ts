import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { LoginService } from '../services/login/login.service';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public users: User[]
  
  private helper = new JwtHelperService

  constructor(private userService: UserService,private router: Router) { }


  ngOnInit(): void {

    if(!this.checkLogin) {

      this.router.navigate(['/login'])

    }
    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      this.router.navigate(['/login'])
    }

    if(this.userService.getUsers()){
      this.userService.getUsers().subscribe(users => {

        console.log(users);
        this.users = users
        
      })
    }
  }

  checkLogin(){
    if (localStorage.getItem("jwt") == null){
      return false
    }else return true
  }

  goToEdit(id: number){
    this.router.navigate(['/edit/'+id])

  }

  goToDetails(id: number){
    this.router.navigate(['/details/'+id])
    
  }

  deleteUser(id: number){

    this.router.navigate([''])
    this.userService.deleteUser(id)
  }

  newUser(){
    this.router.navigate(['/new'])

  }


}
