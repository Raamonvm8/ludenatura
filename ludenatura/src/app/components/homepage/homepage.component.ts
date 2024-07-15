import { Component } from '@angular/core';
import { CabeceraComponent } from "./cabecera/cabecera.component";
import { ActividadesComponent } from "./actividades/actividades.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CabeceraComponent, ActividadesComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
