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
    return this.http.get(this.baseUrl + '/users/login?username=' + user + '&password=' + password, {observe: 'response'});
  }

  existsUser(username: string) {
    return this.http.get(this.baseUrl + '/users/' + username, {observe: 'response'});
  }

  postUser(user: User) {
    return this.http.post(this.baseUrl + '/users/', user);
  }

  getReservasForDate(date: number) {
    return this.http.get(this.baseUrl + '/reservations/' + date, {observe: 'response', headers: this.setAuthorizationHeader()});
  }

  postReservation(courtid: number, rsvdatetime: number) {
    return this.http.post(this.baseUrl + '/reservations', {courtid: courtid, rsvdatetime: rsvdatetime},
      {headers: this.setAuthorizationHeader()});
  }

  setAuthorizationHeader() {
    return new HttpHeaders().set('Authorization', sessionStorage.getItem('token'));
  }

}
