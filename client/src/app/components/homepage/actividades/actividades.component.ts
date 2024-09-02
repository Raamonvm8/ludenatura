import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

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

  

  constructor(private router: Router, private elementRef: ElementRef) {
    
  }

  redirectToCampamentos() {
    this.router.navigate(['/campamentos']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  redirectToTalleres(){
    this.router.navigate(['/talleres']).then(() => {
      window.scrollTo({ top:0, behavior: 'smooth' })
    });

  }

  redirectToActividades(){
    this.router.navigate(['/actividades']).then(() => {
      window.scrollTo({ top:0, behavior: 'smooth' })
    });

  }

  redirectToHoyilla(){
    this.router.navigate(['/lahoyilla']).then(() => {
      window.scrollTo({ top:0, behavior: 'smooth' })
    });

  }


}
