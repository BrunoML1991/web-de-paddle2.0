import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApiConexionService} from './shared/services/api-conexion.service';
import { MainPageComponent } from './main-page/main-page.component';
import { InstalacionesComponent } from './instalaciones/instalaciones.component';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    InstalacionesComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ApiConexionService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
