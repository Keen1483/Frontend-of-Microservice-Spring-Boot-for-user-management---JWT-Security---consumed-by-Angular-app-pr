import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiBaseUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  authenticate(username: string, password: string) {
    const body = new HttpParams()
                        .set('username', username)
                        .set('password', password);
    const headers = new HttpHeaders()
                        .set('Content-Type', 'application/x-www-form-urlencoded');
    return this.httpClient.post<any>(this.apiBaseUrl + '/login', body.toString(), {headers}).pipe(
      map(userData => {
        sessionStorage.setItem('username', username);
        let access_token = userData.access_token;
        let refresh_token = userData.refresh_token;
        sessionStorage.setItem('access_token', 'Bearer ' + access_token);
        sessionStorage.setItem('refresh_token', 'Bearer ' + refresh_token);
      })
    );
  }

  refreshToken() {
    const headers = new HttpHeaders()
                            //.set('Content-Type', 'application/x-www-form-urlencoded')
                            .set('Authorization', sessionStorage.getItem('refresh_token') ?? []);
    return this.httpClient.get<any>(this.apiBaseUrl + '/token/refresh', {headers}).pipe(
      map(userData => {
        let access_token = userData.access_token;
        let refresh_token = userData.refresh_token;
        sessionStorage.setItem('access_token', 'Bearer ' + access_token);
        sessionStorage.setItem('refresh_token', 'Bearer ' + refresh_token);
        console.log(access_token, refresh_token);
      })
    );
  }

  isLoggedIn() {
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    this.router.navigate(['']);
  }

}
