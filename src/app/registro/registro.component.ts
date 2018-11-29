import {Component, OnInit} from '@angular/core';
import {ApiConexionService} from '../shared/services/api-conexion.service';
import {HttpResponse} from '@angular/common/http';
import {User} from '../shared/models/user.model';

declare var jQuery: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: User;
  validUserName: boolean;
  validEmail = true;
  clave1: string;
  validClave = true;
  validSubmit = false;
  birthdate;
  usuarioRegistrado = false;

  constructor(public api: ApiConexionService) {
  }

  sendData() {
    this.assignBirthdate();
    this.validSubmit = false;
    this.usuarioRegistrado = false;
    if (this.validUserName || !this.validEmail || !this.validClave || this.validUserName === undefined) {
      this.validSubmit = true;
    } else {
      this.api.postUser(this.user).subscribe(() => {
        this.user = new User();
        this.clave1 = '';
        this.birthdate = null;
        this.usuarioRegistrado = true;
      }, error1 => {
        alert('Ha fallado la subida de usuario, intentelo de nuevo');
      });
    }
  }

  ngOnInit() {
    this.user = new User();
    this.user.birthdate = null;
  }

  isValidUserName() {
    if (this.user.username !== undefined && this.user.username !== '') {
      this.api.existsUser(this.user.username).subscribe((response: HttpResponse<any>) => {
        this.validUserName = true;
      }, error => {
        this.validUserName = false;
      });
    } else {
      this.validUserName = true;
    }
  }

  isValidEmail() {
    this.validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.user.email);
  }

  isValidPassword() {
    this.validClave = this.clave1 === this.user.password;
  }

  assignBirthdate() {
    this.user.birthdate = new Date(this.birthdate).getTime();
  }

  isLoggedIn() {
    return sessionStorage.getItem('token') != null;
  }
}
