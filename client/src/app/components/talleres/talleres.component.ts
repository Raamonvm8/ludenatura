import { Component, Input } from '@angular/core';
import { FondoComponent } from "../fondo/fondo.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ManualidadesComponent } from './manualidades/manualidades.component';
import { AnimacionComponent } from './animacion/animacion.component';
import { MayoresComponent } from './mayores/mayores.component';
import { CharlasComponent } from './charlas/charlas.component';

@Component({
  selector: 'app-talleres',
  standalone: true,
  imports: [FondoComponent, NgIf, NgFor, RouterOutlet, RouterLink, NgClass, ManualidadesComponent, AnimacionComponent, MayoresComponent, CharlasComponent],
  templateUrl: './talleres.component.html',
  styleUrl: './talleres.component.css'
})
export class TalleresComponent {
  title: string = "TALLERES";
  hola: string = "hola";


  talleres: {title: string, image: string}[] = [];
  selectedIndex: number = -1;

  constructor(private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    const talleresInfo = `
    [
        {"title": "MANUALIDADES", "image": "../../../assets/talleres/manualidades.jpeg"},
        {"title": "ANIMACIÓN", "image": "../../../assets/talleres/animacion.jpeg"},
        {"title": "MAYORES", "image": "../../../assets/talleres/mayores.jpeg"},
        {"title": "CHARLAS", "image": "../../../assets/talleres/charlas.jpeg"}
    ]
    `;
  
    this.talleres = JSON.parse(talleresInfo);
  
    // Detectar la ruta seleccionada al cargar la página
    const section = this.route.snapshot.firstChild?.url[0]?.path;
    this.updateSelection(section);
  
    // Actualizar la selección según los cambios en la ruta
    this.router.events.subscribe(() => {
      const newSection = this.route.snapshot.firstChild?.url[0]?.path;
      this.updateSelection(newSection);
    });
  }

  updateSelection(section: string | undefined) {
    if (section) {
      this.selectedIndex = this.talleres.findIndex(taller => taller.title.toLowerCase() === section.toLowerCase());
    } else {
      this.selectedIndex = -1;
    }
  }

  showHide(index: number) {
    if (this.selectedIndex === index) {
      // If the same index is clicked, navigate to the root /talleres
      this.router.navigate(['/talleres']);
      this.selectedIndex = -1;
    } else {
      // Otherwise, select the new index and navigate to the appropriate section
      this.selectedIndex = index;
      
    }
  }

}
