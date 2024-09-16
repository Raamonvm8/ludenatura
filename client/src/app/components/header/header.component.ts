import { NgFor, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  talleresOpciones = ['Manualidades', 'Animación', 'Mayores', 'Charlas'];
  actividadesOpciones = ['Medioambientales', 'Deportivas & Aventura', 'Culturales'];

  activeDropdown: string | null = null;
  isMenuOpen = false;

  screenWidth = 0; // Variable para almacenar el ancho de la pantalla

  ngOnInit() {
    this.screenWidth = window.innerWidth; // Establecer el ancho inicial
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = window.innerWidth; // Actualizar screenWidth en cada cambio de tamaño
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Verifica si el clic fue fuera del menú
    const target = event.target as HTMLElement;
    const nav = document.querySelector('nav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (this.isMenuOpen && nav && !nav.contains(target) && !menuToggle?.contains(target)) {
      this.isMenuOpen = false; // Cierra el menú
    }
  }

  toggleDropdown(dropdown: string) {
    if (this.activeDropdown === dropdown) {
      this.activeDropdown = null; // Close dropdown if already open
    } else {
      this.activeDropdown = dropdown; // Open the selected dropdown
    }
  }
  

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; 
  }
  
}
