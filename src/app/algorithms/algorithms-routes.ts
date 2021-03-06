import { Routes } from '@angular/router';
import { HanoiComponent } from './hanoi/hanoi.component';
import { McComponent } from './mc/mc.component';
import { SortingComponent } from './sorting/sorting.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
    {
      path: '',
      component: WelcomeComponent
    },
    {
      path: 'hanoi',
      component: HanoiComponent
    },
    {
      path: 'sorting',
      component: SortingComponent
    },
    {
      path: 'monte-carlo',
      component: McComponent
    }
  ];
