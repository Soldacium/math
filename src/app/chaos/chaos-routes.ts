import { WelcomeComponent } from '@chaos/welcome/welcome.component';
import { Routes } from '@angular/router';
import { LorenzComponent } from './lorenz/lorenz.component';

export const routes: Routes = [
    {
      path: '',
      component: WelcomeComponent
    },
    {
      path: 'lorenz',
      component: LorenzComponent
    },
  ];