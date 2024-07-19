import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HeaderComponent } from './components/header/header.component';
import { CampamentosComponent } from './components/campamentos/campamentos.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Ruta por defecto
    { path: 'home', component: HomepageComponent },
    { path: 'campamentos', component: CampamentosComponent},
    { path: 'header', component: HeaderComponent}
];

