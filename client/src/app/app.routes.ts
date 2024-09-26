import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HeaderComponent } from './components/header/header.component';
import { CampamentosComponent } from './components/campamentos/campamentos.component';
import { TalleresComponent } from './components/talleres/talleres.component';
import { ManualidadesComponent } from './components/talleres/manualidades/manualidades.component';
import { AnimacionComponent } from './components/talleres/animacion/animacion.component';
import { MayoresComponent } from './components/talleres/mayores/mayores.component';
import { CharlasComponent } from './components/talleres/charlas/charlas.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { MedioambientalesComponent } from './components/actividades/medioambientales/medioambientales.component';
import { DeportivasyaventuraComponent } from './components/actividades/deportivasyaventura/deportivasyaventura.component';
import { CulturalesComponent } from './components/actividades/culturales/culturales.component';
import { HoyillaComponent } from './components/hoyilla/hoyilla.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { JuncalilloComponent } from './components/juncalillo/juncalillo.component';

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
    { 
        path: 'actividades', 
        component: ActividadesComponent, 
        children: [
            { path: 'medioambientales/:id', component: MedioambientalesComponent },
            { path: 'deportivas & aventura/:id', component: DeportivasyaventuraComponent },
            { path: 'culturales/:id', component: CulturalesComponent },
            

        ]
    },
    { path: 'lahoyilla', component: HoyillaComponent},
    { path: 'juncalillo', component: JuncalilloComponent},
    { path: 'contacto', component: ContactoComponent},

];

