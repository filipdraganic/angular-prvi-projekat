import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { Group } from '../models/group.model';
import { User } from '../models/user.model';
import { GroupService } from '../services/group/group.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public user:User
  public groups:Group[]

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private groupsService: GroupService) { 

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

    this.groups = this.groupsService.allGroups
    


  }

  public addMember(user:User, groupName:string){
    console.log(groupName);
    
    let bool = this.groupsService.addMember(user,groupName)
    if(bool) {
      alert("User dodat u grupu")
    }
    else{
      alert("User nije dodat u grupu vec postoji isti sa istim imenom")
    }
  }

  public groupLen(group:Group):number{

    return group.users.length
  }
}
