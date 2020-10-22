import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login/login.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-projekat';
  private router : Router
  today: number = Date.now();

  constructor(private cdRef:ChangeDetectorRef){}

  checkLogin(){
    if (localStorage.getItem("jwt") == null){
      return false
    }else return true
  }

  logout(){
    localStorage.removeItem("jwt")
    this.router.navigate([''])

  }

  getUsername(){
    return localStorage.getItem("username")
  }

  ngAfterViewChecked()
  {
    console.log( "Dont esta la biblioteka" );
    this.cdRef.detectChanges();
    
  }



}

