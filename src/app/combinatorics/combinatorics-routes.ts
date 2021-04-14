
import { Routes } from '@angular/router';
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
    }
  ];
