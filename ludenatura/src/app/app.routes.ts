import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Ruta por defecto
    { path: 'home', component: HomepageComponent },
];

