import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  constructor() {}

  /*ngOnInit(): void {
    this.setGoogleMapsLink();
  }

  setGoogleMapsLink(): void {
    const linkElement = document.getElementById('como-llegar-link') as HTMLAnchorElement;
    const imageLinkElement = document.getElementById('map-image-link') as HTMLAnchorElement;

    // URL del destino: Albergue La Hoyilla
    const destination = 'Albergue+La+Hoyilla,+Calle+Dr.+Fleming,+130,+35479,+Las+Palmas';

    // Construir la URL de Google Maps (sin especificar el origen)
    const googleMapsURL = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;

    // Establecer el href del enlace y de la imagen
    linkElement.setAttribute('href', googleMapsURL);
    linkElement.removeAttribute('disabled');

    imageLinkElement.setAttribute('href', googleMapsURL);
    imageLinkElement.removeAttribute('disabled');
  }*/

}
