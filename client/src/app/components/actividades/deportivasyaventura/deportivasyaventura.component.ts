import { Component } from '@angular/core';

@Component({
  selector: 'app-deportivasyaventura',
  standalone: true,
  imports: [],
  templateUrl: './deportivasyaventura.component.html',
  styleUrl: './deportivasyaventura.component.css'
})
export class DeportivasyaventuraComponent {
  description: string = '';

  descripRutas: string = 'descripción de rutas';
  descripEscalada: string = 'descripción de escaladas';
  descripSupervivencia: string = 'descripción de supervivencia';
  descripPistaRastreo: string = 'descripción de pista y rastreo';
  descripJuegosCanarios: string= 'descripcion de juegos canarios';


  showDescription(text: string){
    this.description = text;
  }

  clearDescription(){
    this.description = '';
  }

}
