import { Routes } from '@angular/router';
import { HanoiComponent } from './hanoi/hanoi.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
    {
      path: '',
      component: WelcomeComponent
    },
    {
      path: 'hanoi',
      component: HanoiComponent
    }
  ];
