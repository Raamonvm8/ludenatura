import { Component } from '@angular/core';
import { FondoComponent } from "../fondo/fondo.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ManualidadesComponent } from '../talleres/manualidades/manualidades.component';
import { MedioambientalesComponent } from './medioambientales/medioambientales.component';
import { DeportivasyaventuraComponent } from './deportivasyaventura/deportivasyaventura.component';
import { CulturalesComponent } from './culturales/culturales.component';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [FondoComponent, NgIf, NgFor, RouterOutlet, RouterLink, NgClass, MedioambientalesComponent, DeportivasyaventuraComponent, CulturalesComponent],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css'
})
export class ActividadesComponent {

  title: string = "ACTIVIDADES";


  talleres: {title: string, image: string}[] = [];
  selectedIndex: number = -1;

  constructor(private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    const talleresInfo = `
    [
        {"title": "MEDIOAMBIENTALES", "image": "../../../assets/actividades/medioambiente.jpg"},
        {"title": "DEPORTIVAS & AVENTURA", "image": "../../../assets/actividades/deportivas.jpg"},
        {"title": "CULTURALES", "image": "../../../assets/actividades/culturales.jpg"}
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
      this.router.navigate(['/actividades']);
      this.selectedIndex = -1;
    } else {
      // Otherwise, select the new index and navigate to the appropriate section
      this.selectedIndex = index;
      
    }
  }

}
