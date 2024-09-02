import { Component } from '@angular/core';
import { FondoComponent } from "../fondo/fondo.component";

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FondoComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  title: string = 'CONTACTO';

}
