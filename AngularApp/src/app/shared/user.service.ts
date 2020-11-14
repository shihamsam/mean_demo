import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
 

import {User} from './user.model';

@Injectable()
export class UserService {
  
  selectedUser: User;
  users: User[];

  readonly baseUrl = 'http://localhost:3000/users'

  constructor(private http: HttpClient) { 

    this.selectedUser = new User();
  }

  postUser(user: User){
    return this.http.post(this.baseUrl, user);

  }

  putUser(user: User) {
    return this.http.put(`${this.baseUrl}/${user._id}`, user);
  }

  getUserList(){
    return this.http.get(this.baseUrl);
  }

  deleteUser(_id: string): any {
    return this.http.delete(this.baseUrl + `/${_id}`);
  }
  
}
