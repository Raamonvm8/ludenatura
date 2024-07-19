import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FondoComponent } from "../fondo/fondo.component";

@Component({
  selector: 'app-campamentos',
  standalone: true,
  imports: [NgFor, NgIf, FondoComponent],
  templateUrl: './campamentos.component.html',
  styleUrl: './campamentos.component.css'
})
export class CampamentosComponent implements OnInit{
  photos1: string[] = ["../../../assets/campamentos/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg", 
    "../../../assets/campamentos/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg", 
    "../../../assets/campamentos/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
  ];

  
  photos2: string[] = ["../../../assets/campamentos/campamentoImg1.jpg", 
    "../../../assets/campamentos/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg", 
    "../../../assets/homepage-images/actividades.jpg",
    "../../../assets/campamentos/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
  ];

  lugares: {title: string, image: string, sitio: string}[] = [];
  currentActivity: string = '';
  currentIndex: number = 0;
  @ViewChild('activityImg') activityImg!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.currentActivity = this.photos2[0];
    this.startImageRotation();

    const campamentos = `
    [
        {"title": "Albergue La Hoyilla", "image": "../../../assets/homepage-images/albergue_lahoyilla.jpg", "sitio": "LA ALDEA DE SAN NICOLÁS"},
        {"title": "Aula de la Naturaleza de Osorio", "image": "../../../assets/campamentos/osorio.jpg", "sitio": "TEROR"},
        {"title": "Chira", "image": "../../../assets/campamentos/chira.jpg", "sitio": "SAN BARTOLOMÉ DE TIRAJANA"},
        {"title": "Aula de la Naturaleza Las Tederas", "image": "../../../assets/campamentos/tederas.jpg", "sitio": "SANTA LUCÍA DE TIRAJANA"},
        {"title": "Aula de la Naturaleza La Palmita", "image": "../../../assets/campamentos/LaPalmita.png", "sitio": "AGAETE"},
        {"title": "Finca Bailadero", "image": "../../../assets/campamentos/ElBailadero.png", "sitio": "TELDE"},
        {"title": "Cortijo de Huertas", "image": "../../../assets/campamentos/cortijoHuertas.jpg", "sitio": "TEJEDA"}
    ]
    `;

    this.lugares = JSON.parse(campamentos);
  }

  startImageRotation() {
    setInterval(() => {
      this.fadeOutImage();
      setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.photos2.length;
        this.currentActivity = this.photos2[this.currentIndex];
        this.fadeInImage();
      }, 1000); // Duration of the fade out
    }, 3000); // Duration between transitions
  }

  fadeOutImage() {
    this.renderer.setStyle(this.activityImg.nativeElement, 'opacity', '0');
  }

  fadeInImage() {
    this.renderer.setStyle(this.activityImg.nativeElement, 'opacity', '1');
  }


}
