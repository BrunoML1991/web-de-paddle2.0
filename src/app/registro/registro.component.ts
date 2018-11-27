import {Component, OnInit} from '@angular/core';
import {ApiConexionService} from '../shared/services/api-conexion.service';
import {HttpResponse} from '@angular/common/http';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {matchOtherValidator} from './matchOtherValidator';

declare var jQuery: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(public api: ApiConexionService, public fb: FormBuilder) {
    this.registro = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      passwordRegistro: ['', Validators.required],
      confirmPassword: ['', [Validators.required, matchOtherValidator('passwordRegistro')]],
      birthdate: ['']
    });
  }

  registro: FormGroup;

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

  isLoggedIn() {
    return sessionStorage.getItem('token') != null;
  }
}
