import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnightComponent } from './knight/knight.component';
import { RouterModule } from '@angular/router';
import { routes } from '@combinatorics/combinatorics-routes';
import { WelcomeComponent } from '@algorithms/welcome/welcome.component';
import { CombinatoricsComponent } from './combinatorics.component';
import { SharedModule } from '@shared/shared.module';
import { PathfindingComponent } from './pathfinding/pathfinding.component';



@NgModule({
  declarations: [
    KnightComponent,
    WelcomeComponent,
    CombinatoricsComponent,
    PathfindingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CombinatoricsModule { }
