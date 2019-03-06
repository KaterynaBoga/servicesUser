import { TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { InfoService } from './info.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [InfoService]
})
export class AppComponent implements OnInit {

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  editedUser: User;
  items: User[] = [];
  isNewRecord: boolean;

  constructor(private infoService: InfoService){}

  addItem(name: string, age: number){

    this.infoService.addUser(name, age);
  }

  editUser(user: User) {
    this.editedUser = new User(user.id, user.name, user.age);
  }

  loadTemplate(user: User) {
    if (this.editedUser && this.editedUser.id === user.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  saveUser() {
      this.infoService.editUser(this.editedUser.id, this.editedUser.name, this.editedUser.age);
      this.editedUser = null;
  }

  ngOnInit(){
    this.items = this.infoService.getData();
  }
}
