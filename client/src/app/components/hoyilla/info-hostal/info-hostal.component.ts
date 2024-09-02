import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-info-hostal',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './info-hostal.component.html',
  styleUrl: './info-hostal.component.css'
})
export class InfoHostalComponent {
  images: string[] = [
    '../../../../assets/talleres/no-photo.jpg',
    '../../../../assets/talleres/no-photo.jpg',
    '../../../../assets/talleres/no-photo.jpg',
    '../../../../assets/talleres/no-photo.jpg',
    '../../../../assets/talleres/no-photo.jpg',
    '../../../../assets/talleres/no-photo.jpg',
    '../../../../assets/talleres/no-photo.jpg',
    '../../../../assets/talleres/no-photo.jpg',
    '../../../../assets/talleres/no-photo.jpg',
    '../../../../assets/talleres/no-photo.jpg',
    '../../../../assets/talleres/no-photo.jpg',
    '../../../../assets/talleres/no-photo.jpg',
    // Añade más imágenes aquí
  ];
  
  currentImageIndex: number = 0;

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex === 0) ? this.images.length - 1 : this.currentImageIndex - 1;
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex === this.images.length - 1) ? 0 : this.currentImageIndex + 1;
  }

  setCurrentImage(index: number) {
    this.currentImageIndex = index;
  }

}
