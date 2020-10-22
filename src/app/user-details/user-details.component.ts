import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public user:User

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService) { 

      this.formGroup = this.formBuilder.group({
        // ID: [this.user.id],
        // firstName: [this.user.firstName],
        // lastName: [this.user.lastName]
      })


    }

  
  
  private routeSub: Subscription

  public formGroup: FormGroup

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      const idNum :number = Number(params["id"])
      console.log(idNum) //log the value of id
      this.userService.getUsers().subscribe((users:User[])=>{
        this.user = users.filter(user => user.id === idNum)[0]
        console.log(this.user)

      })
      
      
      
      
    });


  }

}
