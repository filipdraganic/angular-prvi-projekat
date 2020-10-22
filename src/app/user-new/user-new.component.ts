import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

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

    this.userService.newUser(user).subscribe(user=>{
      console.log(user)
    })

    this.router.navigate([''])
  }

}
