import { Component } from '@angular/core';

@Component({
  selector: 'app-medioambientales',
  standalone: true,
  imports: [],
  templateUrl: './medioambientales.component.html',
  styleUrl: './medioambientales.component.css'
})
export class MedioambientalesComponent {
  description: string = '';

  descripArbol: string = 'descripción plantación de árbol';
  descripSender: string = 'descripción senderismo interpretativo';
  descripViveros: string = 'descripción viveros';
  descripConstr: string = 'descripción construccion huerto';
  descripArt: string= 'descripcion art-land';
  descripCamposHer: string= 'descripcion campos y herbarios';
  descripLaurisilva: string= 'descripcion estudio de la Laurisilva';
  descripJuegosNaturaleza: string= 'descripcion juegos en la naturaleza';
  


  showDescription(text: string){
    this.description = text;
  }

  clearDescription(){
    this.description = '';
  }

}
