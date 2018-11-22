import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MainPageComponent} from './main-page/main-page.component';
import {InstalacionesComponent} from './instalaciones/instalaciones.component';
import {RegistroComponent} from './registro/registro.component';

const routes: Routes = [
  {path: 'main_page', component: MainPageComponent},
  {path: 'instalaciones', component: InstalacionesComponent},
  {path: 'registro', component: RegistroComponent},
  {path: '', redirectTo: 'main_page', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
