import { Injectable } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groups: Group[]
  private group: Group
  constructor() {
    this.groups = []
    this.group = new Group([], '404')
    this.groups.push(this.group)
   }

   public addMember(user: User, groupName:string){
     this.groups.forEach(group => {
       if(group.groupName === groupName)
        group.users.push(user)
     });
   }

   public getMembers(groupName: string): User[]{

    this.groups.forEach(group=>{
      if(group.groupName === groupName)
        return group.users
    })
    return null
   }


   public addGroup(groupName: string):boolean{

    this.groups.forEach(group=>{
      if(group.groupName === groupName)
        return false
    })
    let group = new Group([],groupName)
    this.groups.push(group)

    return true
   }

   public get allGroups():Group[]{
      return this.groups
   }

}
