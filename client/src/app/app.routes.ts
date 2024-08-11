import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HeaderComponent } from './components/header/header.component';
import { CampamentosComponent } from './components/campamentos/campamentos.component';
import { TalleresComponent } from './components/talleres/talleres.component';
import { ManualidadesComponent } from './components/talleres/manualidades/manualidades.component';
import { AnimacionComponent } from './components/talleres/animacion/animacion.component';
import { MayoresComponent } from './components/talleres/mayores/mayores.component';
import { CharlasComponent } from './components/talleres/charlas/charlas.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Ruta por defecto
    { path: 'home', component: HomepageComponent },
    { path: 'campamentos', component: CampamentosComponent},
    { path: 'header', component: HeaderComponent},
    { 
        path: 'talleres', 
        component: TalleresComponent, 
        children: [
            { path: 'manualidades/:id', component: ManualidadesComponent },
            { path: 'animación/:id', component: AnimacionComponent},
            { path: 'mayores/:id', component: MayoresComponent},
            { path: 'charlas/:id', component: CharlasComponent}

        ]
    },
];

