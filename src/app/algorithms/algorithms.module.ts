import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgorithmsComponent } from './algorithms.component';
import { HanoiComponent } from './hanoi/hanoi.component';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { routes } from './algorithms-routes';
import { SortingComponent } from './sorting/sorting.component';
import { FormsModule } from '@angular/forms';
import { McComponent } from './mc/mc.component';


@NgModule({
  declarations: [
    AlgorithmsComponent,
    HanoiComponent,
    WelcomeComponent,
    SortingComponent,
    McComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AlgorithmsModule { }
