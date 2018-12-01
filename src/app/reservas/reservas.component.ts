import {Component, OnInit} from '@angular/core';
import {ApiConexionService} from '../shared/services/api-conexion.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Reserva} from '../shared/models/reserva.model';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  minDate = new Date();
  fechaReservas;
  reservasTable = false;
  pistas = [1, 2, 3, 4];
  horas = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  pistasReservadas: Array<Reserva>;
  reservaRealizada = false;
  errorReserva: string;
  errorPost = false;

  constructor(public api: ApiConexionService) {
  }

  ngOnInit() {
  }

  getReservas() {
    this.reservaRealizada = false;
    this.errorPost = false;
    if (this.fechaReservas === undefined) {
      alert('Elija una fecha para ver disponibilidad');
    } else {
      this.api.getReservasForDate(new Date(this.fechaReservas).getTime()).subscribe((response: HttpResponse<any>) => {
        sessionStorage.setItem('token', response.headers.get('Authorization'));
        this.reservasTable = true;
        this.pistasReservadas = response.body;
      }, error1 => {
        this.reservasTable = false;
        this.errorHandler(error1);
      });
    }
  }

  isReservado(pista: number, hora: number) {
    if (this.pistasReservadas === null) {
      return false;
    }
    for (let reserva of this.pistasReservadas) {
      if (reserva.courtId === pista && hora === parseInt(reserva.rsvtime.split(':')[0])) {
        return true;
      }
    }
    return false;
  }

  reservar(pista: number, hora: number) {
    this.api.postReservation(pista, new Date(this.fechaReservas).getTime() + hora * 60 * 60 * 1000).subscribe(() => {
      this.reservasTable = false;
      this.reservaRealizada = true;
    }, error1 => {
      this.errorPost = true;
      this.reservasTable = false;
      this.errorHandler(error1);
    });
  }

  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 400) {
      this.errorReserva = '*Pista ya reservada a la hora especificada, vuelva a intentar al proceso';
    } else if (error.status === 401) {
      sessionStorage.setItem('token', '');
      this.errorReserva = '*Tiempo de autenticación expirado, vuelva a autenticarse para continuar con la reserva';
    } else if (error.status === 409) {
      this.errorReserva = '*Cantidad de reservas máximas alcanzadas (4), utilice otro usuario si quiere realizar la reserva';
    } else {
      this.errorReserva = '*Error inesperado, Vuelva a intentarlo más tarde';
    }
  }

  isLoggedIn() {
    return sessionStorage.getItem('token') != null;
  }
}
