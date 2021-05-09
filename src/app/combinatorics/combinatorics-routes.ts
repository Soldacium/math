
import { Routes } from '@angular/router';
import { EulerCycleComponent } from './euler-cycle/euler-cycle.component';
import { KnightComponent } from './knight/knight.component';
import { PathfindingComponent } from './pathfinding/pathfinding.component';
import { WelcomeComponent } from './welcome/welcome.component';



export const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent
    },
    {
        path: 'knight',
        component: KnightComponent
    },
    {
        path: 'pathfinding',
        component: PathfindingComponent
    },
    {
        path: 'euler-cycle',
        component: EulerCycleComponent
    }
  ];
