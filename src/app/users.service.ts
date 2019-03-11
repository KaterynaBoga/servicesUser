import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class UserService {

  private url = 'https://jsonplaceholder.typicode.com/users';
  constructor(
      private http: HttpClient,
      private messageService: MessageService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url)
        .pipe(
            tap(_ => this.log('fetched users')),
            catchError(this.handleError('getUsers', []))
        );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, httpOptions).pipe(
        tap((newUser: User) => this.log(`added user w/ id=${newUser.id}`)),
        catchError(this.handleError<User>('addUser'))
    );
  }

  getUser(id: number): Observable<User> {
    const url = `${this.url}/${id}`;
    return this.http.get<User>(url).pipe(
        tap(_ => this.log(`fetched user id=${id}`)),
        catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted user id=${id}`)),
        catchError(this.handleError<User>('deleteUser'))
    );
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(this.url, user, httpOptions).pipe(
        tap(_ => this.log(`updated user id=${user.id}`)),
        catchError(this.handleError<any>('updateUser'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }

  // createUser(user: User) {
  //   return this.http.post(this.url, user);
  // }
  // updateUser(id: number, user: User) {
  //   const urlParams = new HttpParams().set('id', id.toString());
  //   return this.http.put(this.url, user, { params: urlParams});
  // }
  // deleteUser(id: number){
  //   const urlParams = new HttpParams().set('id', id.toString());
  //   return this.http.delete(this.url, { params: urlParams});
  // }

}
