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

   public addMember(user: User, groupName:string):boolean{
     let test = true
     this.groups.forEach(group => {
       if(group.groupName === groupName){
        group.users.forEach(letuser =>{
          if(letuser.id === user.id) test = false
        })
        if(test){
         group.users.push(user)
         
        }
      }
     });

     return test
     
   }

   public getMembers(groupName: string): User[]{
    console.log("groupName u getmembers u groupservice")
    console.log(groupName);
    let toReturn = null
    this.groups.forEach(group=>{
      if(group.groupName === groupName){
        console.log(group.users)
        toReturn= group.users}
    })
    return toReturn
   }


   public addGroup(groupName: string):boolean{
    let test = true
    this.groups.forEach(group=>{
      console.log(group.groupName)
      if(group.groupName === groupName)
        test = false
    })
    if(!test) return test

    let group = new Group([],groupName)
    this.groups.push(group)

    return true
   }

   public get allGroups():Group[]{
      return this.groups
   }


   public removeFromGroup(userid:number, groupName:string){

    this.groups.forEach(group =>{
      if(group.groupName === groupName){
        group.users.forEach(element => {
          if(element.id === userid){
            group.users.splice(group.users.indexOf(element),1)
          }
        });
      }
    })

   }


   public removeFromAllGroups(user:User){
     this.groups.forEach(group =>{
       group.users.forEach(letuser =>{
         console.log(letuser)
         console.log(user);
         
         if(letuser.id === user.id){
           console.log("Remove from all group index");
           console.log(group.users.indexOf(letuser));
           
           
           group.users.splice(group.users.indexOf(letuser), 1)
         }
       })
     })
   }

}
