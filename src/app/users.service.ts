import { User } from './user';

export class UserService {

  addData(data: User[], name: string, age: number)  {
    const id = data.length + 1;
    data.push(new User(id, name, age));
  }
}
