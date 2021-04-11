import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgorithmsComponent } from './algorithms.component';
import { HanoiComponent } from './hanoi/hanoi.component';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { routes } from './algorithms-routes';


@NgModule({
  declarations: [
    AlgorithmsComponent,
    HanoiComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AlgorithmsModule { }
