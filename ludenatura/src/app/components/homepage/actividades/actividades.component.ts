import { Component } from '@angular/core';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css'
})
export class ActividadesComponent {
  campamentos: string = "../../../../assets/homepage-images/campamentos.jpg";
  talleres: string = "../../../../assets/homepage-images/talleres.png";
  actividades: string = "../../../../assets/homepage-images/actividades.jpg";
  albergue: string = "../../../../assets/homepage-images/albergue_lahoyilla.jpg"

}
