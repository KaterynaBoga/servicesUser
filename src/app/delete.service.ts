import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DeleteService {
    private url = 'https://jsonplaceholder.typicode.com/users';
    constructor(private http: HttpClient) { }

    deleteUser(id: number) {
      const urlParams = new HttpParams().set('id', id.toString());
      return this.http.delete(this.url, { params: urlParams});
    }
}
