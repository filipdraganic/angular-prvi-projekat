import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Group } from '../models/group.model';
import { GroupService } from '../services/group/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  private groups: Group[]
  private group: Group
  createForm: FormGroup
  constructor(private groupsService: GroupService,
              private formBuilder: FormBuilder) {
    this.groups = []
    
    this.createForm = this.formBuilder.group({
      groupName:['', [Validators.required, Validators.minLength(3)]]
    })
   }

  ngOnInit(): void {
    this.groups = this.groupsService.allGroups

  }

  public submitForm(groupName:string){
    if(this.groupsService.addGroup(groupName)){
      alert("Napravljena grupa")
     }
    else
      alert("Nije napravljena grupa, postoji vec sa istim imenom")

  }





}
