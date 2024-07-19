import { Component } from '@angular/core';
import { CabeceraComponent } from "./cabecera/cabecera.component";
import { ActividadesComponent } from "./actividades/actividades.component";
import { CampamentosComponent } from '../campamentos/campamentos.component';
import { FondoComponent } from "../fondo/fondo.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CabeceraComponent, ActividadesComponent, CampamentosComponent, FondoComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
