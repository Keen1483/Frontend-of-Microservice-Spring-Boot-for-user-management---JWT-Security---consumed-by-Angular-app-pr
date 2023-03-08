import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../model/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  apiBaseUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getRoles() {
    return this.httpClient.get<Role[]>(this.apiBaseUrl + '/roles');
  }

  saveRole(role: Role) {
    return this.httpClient.post<Role>(this.apiBaseUrl + '/role/save', role);
  }

  addRolesToUser(username: string = '', roles: Role[]) {
    return this.httpClient.post<any>(this.apiBaseUrl + `/role/addtouser/${username}`, roles);
  }
}
