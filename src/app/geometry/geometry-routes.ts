import { Routes } from '@angular/router';
import { FractalsComponent } from './fractals/fractals.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent
    },
    {
        path: 'fractals',
        component: FractalsComponent
    }
  ];
