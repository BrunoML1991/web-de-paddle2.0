import {Component, OnInit} from '@angular/core';
import {ApiConexionService} from './shared/services/api-conexion.service';
import {HttpResponse} from '@angular/common/http';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private wrongPassworOrUser = false;
  private logInOut = 'Log-In';

  constructor(private conexion: ApiConexionService) {
  }

  ngOnInit() {
  }

  logIn(user, password) {
    this.wrongPassworOrUser = false;
    if (user.toString() === '' || password.toString() === '') {
      this.wrongPassworOrUser = true;
    } else {
      this.conexion.authenticate(user, password).subscribe((response: HttpResponse<any>) => {
          sessionStorage.setItem('token', response.headers.get('Authorization'));
          this.logInOut = 'Log-Out';
          jQuery('#log-in').attr('data-target', '#modal-out');
          jQuery('#close-modal').click();
        }, error => {
          this.wrongPassworOrUser = true;
          console.log(error);
        }
      );
    }
  }

  logOut() {
   sessionStorage.removeItem('token');
    this.logInOut = 'Log-In';
    jQuery('#log-in').attr('data-target', '#modal-in');
    jQuery('#close-modal-out').click();
  }
}
