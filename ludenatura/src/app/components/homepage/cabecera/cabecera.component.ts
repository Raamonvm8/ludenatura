import { Component } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent {
  title: string = "Hola, Somos Ludenatura";
  intro: string = "Ludenatura es una empresa canaria con más de 30 años de experiencia en el sector. Somos especialistas en la gestión de campamentos, talleres, celebraciones y todo tipo de actividades lúdicas, deportivas, culturales y medioambientales. Además, gestionamos el Albergue la Hoyilla en La Aldea de San Nicolás. ";



}
