import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiConexionService {
  private baseUrl = 'http://fenw.etsisi.upm.es:1723';

  constructor(private http: HttpClient) {
  }

  authenticate(user: string, password: string) {
    return this.http.get(this.baseUrl + '/users/login?name=' + user + '&password=' + password, {observe: 'response'});
  }

  existsUser(username: string) {
    return this.http.get(this.baseUrl + '/users/' + username, {observe: 'response'});
  }

  postUser(user: User) {
    return this.http.post(this.baseUrl + '/users/', user);
  }
}
