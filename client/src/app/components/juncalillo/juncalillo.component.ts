import { Component } from '@angular/core';
import { FondoComponent } from '../fondo/fondo.component';
import { InfoHostalComponent } from '../hoyilla/info-hostal/info-hostal.component';
import { MapComponent } from '../hoyilla/map/map.component';
import { ClientesComponent } from '../hoyilla/clientes/clientes.component';
import { SocialLinksComponent } from '../social-links/social-links.component';
import { MapJuncalilloComponent } from "./map-juncalillo/map-juncalillo.component";

@Component({
  selector: 'app-juncalillo',
  standalone: true,
  imports: [FondoComponent, InfoHostalComponent, MapComponent, ClientesComponent, SocialLinksComponent, MapJuncalilloComponent],
  templateUrl: './juncalillo.component.html',
  styleUrl: './juncalillo.component.css'
})
export class JuncalilloComponent {
  title: string = 'JUNCALILLO';

  lis: string[] = [
    'descript 1',
    'descript 2',
    'descript 3',
    '...',


  ];

  images: string[] = [
    '../../../../assets/talleres/no-photo.jpg',
    '../../../../assets/talleres/no-photo.jpg',
    '../../../../assets/talleres/no-photo.jpg',
    '../../../../assets/talleres/no-photo.jpg',
    '../../../../assets/talleres/no-photo.jpg',
    '../../../../assets/talleres/no-photo.jpg',
    '../../../../assets/talleres/no-photo.jpg',
    '../../../../assets/talleres/no-photo.jpg',
    '../../../../assets/talleres/no-photo.jpg',
    '../../../../assets/talleres/no-photo.jpg',
    '../../../../assets/talleres/no-photo.jpg',
    '../../../../assets/talleres/no-photo.jpg',
  ];

}
