import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-hostal',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './info-hostal.component.html',
  styleUrl: './info-hostal.component.css'
})
export class InfoHostalComponent {
  @Input() images: string[] | undefined;
  @Input() lis: string[] | undefined;

  
  
  
  currentImageIndex: number = 0;

  prevImage() {
    if (this.images?.length) {
      this.currentImageIndex = (this.currentImageIndex === 0) ? this.images.length - 1 : this.currentImageIndex - 1;
    }
  }

  nextImage() {
    if (this.images?.length) { 
      this.currentImageIndex = (this.currentImageIndex === this.images.length - 1) ? 0 : this.currentImageIndex + 1;
    }
  }

  setCurrentImage(index: number) {
    if (this.images?.length) {
      this.currentImageIndex = index;
    }
  }

}
