import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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
}
