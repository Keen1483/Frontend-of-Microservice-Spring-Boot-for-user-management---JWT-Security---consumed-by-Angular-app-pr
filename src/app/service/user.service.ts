import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { User } from '../model/user.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiBaseUrl = environment.apiBaseUrl;
  users: User[];
  userSubject$ = new Subject<User[]>();

  findUser: string|undefined;

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {}

  emitUserSubject() {
    this.userSubject$.next(this.users.slice());
  }

  getUsers() {
    return this.httpClient.get<User[]>(this.apiBaseUrl + '/users').subscribe(
      (users: User[]) => {
        this.users = users;
        this.emitUserSubject();
      },
      (error) => {
        if (error.error.error_message != null && error.error.error_message.startsWith('The Token has expired on')) {
          this.authService.refreshToken().subscribe(
            response => {
              this.getUsers();
              console.log('Token was refreshed from getUsers method');
            }
          );
        }
      }
    );
  }

  getUser(username: string) {
    return this.httpClient.get<User>(this.apiBaseUrl + `/user/${username}`);
  }

  saveUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiBaseUrl + '/user/save', user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.httpClient.put<User>(this.apiBaseUrl + `/user/update/${id}`, user);
  }

  deleteUser(username: string) {
    return this.httpClient.delete<any>(this.apiBaseUrl + `/user/delete/${username}`);
  }

}
