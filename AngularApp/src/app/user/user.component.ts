import { Component, OnInit } from '@angular/core';

import {UserService} from '../shared/user.service';
import { NgForm } from '@angular/forms';
import { User } from '../shared/user.model';

declare var M: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshUsers();
  }

  resetForm(form?: NgForm){

    if(form){
      form.reset();
      this.userService.selectedUser = {
        "_id":"",
        "name": "",
        "dob":""
      }
    }
  }

  onSubmit(form: NgForm){

   if(!form.value._id){     
     this.userService.postUser(form.value).subscribe( res => {
       this.resetForm(form);
       this.refreshUsers();
       M.toast({ html: 'Saved successfully', classes: 'rounded'});
      })
    }
    else
    {
      this.userService.putUser(form.value).subscribe( res => {
        this.resetForm(form);
        this.refreshUsers();

        M.toast({ html: 'Updated successfully', classes: 'rounded'});
      });
    }
  }

  refreshUsers(){
    this.userService.getUserList().subscribe(res => {
      this.userService.users = res as User[];
    });
  }

  onEdit(user){
    this.userService.selectedUser = user;
  }

  onDelete(_id: string, form: NgForm){
    if(confirm('Are you sure to delete this record?')){
      this.userService.deleteUser(_id).subscribe(res => {
        this.resetForm(form)
        this.refreshUsers();
          M.toast({ html: 'Deleted successfully', classes: 'rounded'});
      });
    }
  }

}
