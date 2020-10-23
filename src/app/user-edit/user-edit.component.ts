import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  createForm : FormGroup
  public user: User
  private routeSub: Subscription

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router:Router,
    private route: ActivatedRoute) {

      this.routeSub = this.route.params.subscribe(params => {
        console.log(params) //log the entire params object
        const idNum :number = Number(params["id"])
        console.log(idNum) //log the value of id
        this.userService.getUsers().subscribe((users:User[])=>{
          this.user = users.filter(user => user.id === idNum)[0]
          console.log(this.user)
          this.createForm = this.formBuilder.group({
    
            firstName: [this.user.firstName, [Validators.required, Validators.minLength(4)]],
            lastName: [this.user.lastName, [Validators.required, Validators.minLength(4)]]        
    
          })
        })
      });
      
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
