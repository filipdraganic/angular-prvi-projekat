import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { LoginService } from '../services/login/login.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup
  

  constructor(private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService) {
      
  this.loginForm = this.formBuilder.group({
  // Odgovarajuce HTML elemente cemo povezati atributom formControlName="..."
  // ['default value', [validators]
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    duration: ['', Validators.required]
  })
  }

  ngOnInit(): void {
  }

  public get username(){
    return this.loginForm.get('username')
  }

  public get password(){
    return this.loginForm.get('password')
  }

  public get duration(){
    return this.loginForm.get('duration')
  }

  public submitForm(credentials){
    this.loginService.login(credentials).subscribe(data => {
      this.router.navigate([''])
    })
  }
}
