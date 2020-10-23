import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Group } from '../models/group.model';
import { User } from '../models/user.model';
import { GroupService } from '../services/group/group.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {
  private routeSub: Subscription

  public group : Group
  public users : User[]
  public groupName : string
  constructor(private groupService: GroupService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe(params => {

      console.log(params) //log the entire params object
      const idNum :string = String(params["id"])
      console.log(idNum) //log the value of id
      this.groupName = idNum
      this.users = this.groupService.getMembers(this.groupName)
      console.log(this.users);
      
    
    }); 

  }

  public removeFromGroup(userId: number){

    this.groupService.removeFromGroup(userId, this.groupName)

  }

}
