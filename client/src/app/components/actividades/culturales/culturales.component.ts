import { Component } from '@angular/core';

@Component({
  selector: 'app-culturales',
  standalone: true,
  imports: [],
  templateUrl: './culturales.component.html',
  styleUrl: './culturales.component.css'
})
export class CulturalesComponent {
  description: string = '';

  descripPayasos: string = 'descripción de payasos';
  descripTiteres: string = 'descripción de títeres';
  descripMural: string = 'descripción de Mural';


  showDescription(text: string){
    this.description = text;
  }

  clearDescription(){
    this.description = '';
  }
}
