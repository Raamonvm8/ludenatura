import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit{
  constructor() { }

  ngOnInit(): void {
    this.setGoogleMapsLink();
  }

  setGoogleMapsLink(): void {
    const linkElement = document.getElementById('como-llegar-link') as HTMLAnchorElement;
    const imageLinkElement = document.getElementById('map-image-link') as HTMLAnchorElement;

    // Deshabilita el enlace y la imagen mientras se genera la URL
    linkElement.classList.add('disabled');
    imageLinkElement.classList.add('disabled');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // URL del destino: Albergue La Hoyilla
          const destination = 'Albergue+La+Hoyilla,+Calle+Dr.+Fleming,+130,+35479,+Las+Palmas';

          // Construir la URL de Google Maps
          const googleMapsURL = `https://www.google.com/maps/dir/${latitude},${longitude}/${destination}/`;

          // Establecer el href del enlace y de la imagen, y habilitarlos
          linkElement.setAttribute('href', googleMapsURL);
          linkElement.classList.remove('disabled');

          imageLinkElement.setAttribute('href', googleMapsURL);
          imageLinkElement.classList.remove('disabled');
        },
        (error) => {
          console.error('Error al obtener la ubicación: ', error);
        }
      );
    } else {
      console.error('Geolocalización no es soportada por este navegador.');
    }
  }

}
