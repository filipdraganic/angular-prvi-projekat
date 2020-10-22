import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  createForm : FormGroup

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router:Router) {

      this.createForm = this.formBuilder.group({
    
        firstName: ['', [Validators.required, Validators.minLength(4)]],
        lastName: ['', [Validators.required, Validators.minLength(4)]]        

      })
  }

  ngOnInit(): void {
  }

  public get firstName(){
    return this.createForm.get("firstName")
  }

  public get lastName(){
    return this.createForm.get("lastName")
  }


  public submitForm(credentials){
    console.log(credentials); 

    const user: User={
      id : 0,
      firstName: credentials["firstName"],
      lastName: credentials["lastName"]
    }

    this.userService.editUser(user).subscribe(user=>{
      console.log(user)
    })

    this.router.navigate([''])
  }
}
