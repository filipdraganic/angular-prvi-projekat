import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from '../models/group.model';
import { GroupService } from '../services/group/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  public groups: Group[]
  private group: Group
  createForm: FormGroup
  
  constructor(private groupsService: GroupService,
              private formBuilder: FormBuilder,
              private router:Router) {
    this.groups = []
    
    this.createForm = this.formBuilder.group({
      groupName:['', [Validators.required, Validators.minLength(3)]]
    })
   }

  ngOnInit(): void {
    this.groups = this.groupsService.allGroups

  }

  public get groupName(){
    return this.createForm.get["groupName"]
  }

  public submitForm(groupName:any){
    if(this.groupsService.addGroup(groupName["groupName"])){
      alert("Napravljena grupa")
      this.groups = this.groupsService.allGroups
      console.log(this.groups)
     }
    else
      alert("Nije napravljena grupa, postoji vec sa istim imenom")

  }

  public groupLen(group:Group):number{

    return group.users.length
  }

  public goToDetails(groupName: string){

    this.router.navigate(["groups/"+groupName])
    
  }




}
