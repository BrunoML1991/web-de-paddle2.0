import {Component, OnInit} from '@angular/core';
import {ApiConexionService} from '../shared/services/api-conexion.service';
import {HttpResponse} from '@angular/common/http';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

declare var jQuery: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  name: string;
  clave1: string;
  clave2: string;
  registro: FormGroup;

  constructor(public api: ApiConexionService, public fb: FormBuilder) {
    this.registro = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      birthdate: ['']
    });
  }

  sendData() {
    console.log(this.registro.value);
  }

  ngOnInit() {
  }

  isValidUserName(control: AbstractControl) {
    /*if (control.value != null || typeof control.value === 'string' && control.value.length !== 0) {
      this.api.existsUser(control.value).subscribe((response: HttpResponse<any>) => {
        return {'nameExists': true};
      }, error => {
        return null;
      });
    } else {
      return null;
    }*/
  }

  isValidPassword() {
    if (this.clave1 === this.clave2) {
      return null;
    } else {
    }
  }

  isLoggedIn() {
    return sessionStorage.getItem('token') != null;
  }
}
