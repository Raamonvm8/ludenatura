import { Component } from '@angular/core';
import { FondoComponent } from "../fondo/fondo.component";
import { MapaComponent } from "../campamentos/mapa/mapa.component";
import { MapaOfficeComponent } from "./mapa-office/mapa-office.component";

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FondoComponent, MapaOfficeComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  title: string = 'CONTACTO';

}
