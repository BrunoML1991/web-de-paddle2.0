import {Component, OnInit} from '@angular/core';
import {ApiConexionService} from '../shared/services/api-conexion.service';

declare var jQuery: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  username: string;

  constructor(private api: ApiConexionService) {
  }

  ngOnInit() {
  }

  isValidUserName() {

  }

  isValidEmail(mail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail);
  }
}
