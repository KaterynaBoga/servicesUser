import { Injectable } from '@angular/core';
import { UserService } from './users.service';
import { EditService } from './edit.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private data: User[] = [
    { id: 1, name: 'Sam', age: 56},
    { id: 2, name: 'Jhon', age: 19},
    { id: 3, name: 'Vitek', age: 25}
  ];

  getData(): User[] {
    return this.data;
  }

  addUser(name: string, age: number) {
    this.userService.addData(this.data, name, age);
  }

  editUser(id: number, name: string, age: number) {
    this.editService.updateUser(this.data, id, name, age);
  }



  constructor(private userService: UserService, private editService: EditService) { }
}
