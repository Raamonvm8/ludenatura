import { Component } from '@angular/core';
import { FondoComponent } from "../fondo/fondo.component";
import { InfoHostalComponent } from "./info-hostal/info-hostal.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { MapComponent } from "./map/map.component";
import { SocialLinksComponent } from "../social-links/social-links.component";

@Component({
  selector: 'app-hoyilla',
  standalone: true,
  imports: [FondoComponent, InfoHostalComponent, ClientesComponent, MapComponent, SocialLinksComponent],
  templateUrl: './hoyilla.component.html',
  styleUrl: './hoyilla.component.css'
})
export class HoyillaComponent {
  title: string = 'LA HOYILLA';

  lis: string[] = [
    '50 plazas',
    'Habitaciones con baño',
    'Habitaciones privadas y compartidas',
    'Wifi',
    'Terrazas externas',
    'Aparcamiento',
    'Cocina propia',

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
    // Añade más imágenes aquí
  ];


  mapa: string = "https://maps.google.com/maps?q=Albergue+La+Hoyilla&amp;t=m&amp;z=12&amp;output=embed&amp;iwloc=near";

  color: string = 'black';
  muestraWhatsapp: boolean = false;
  facebook: string = 'https://www.facebook.com/laHoyilla';
  twitter: string = 'https://x.com/alberguehoyilla?s=11&t=53afhvyRV-eK66mFMst6vA';
  instagram: string = 'https://www.instagram.com/alberguehoyilla/';
  tiktok: string = 'https://www.tiktok.com/@alberguehoyilla';

}
