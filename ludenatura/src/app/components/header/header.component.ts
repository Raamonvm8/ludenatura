import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  talleresOpciones = ['Manualidades', 'Animación', 'Varios'];
  actividadesOpciones = ['Medioambientales', 'Deportivas & Aventura', 'De una jornada'];
  
}
