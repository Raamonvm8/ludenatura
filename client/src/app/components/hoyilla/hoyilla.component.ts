import { Component } from '@angular/core';
import { FondoComponent } from "../fondo/fondo.component";
import { InfoHostalComponent } from "./info-hostal/info-hostal.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { MapComponent } from "./map/map.component";

@Component({
  selector: 'app-hoyilla',
  standalone: true,
  imports: [FondoComponent, InfoHostalComponent, ClientesComponent, MapComponent],
  templateUrl: './hoyilla.component.html',
  styleUrl: './hoyilla.component.css'
})
export class HoyillaComponent {
  title: string = 'LA HOYILLA';

}
