import { WelcomeComponent } from '@algorithms/welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'algorithms',
    loadChildren: () => import('@algorithms/algorithms.module').then(m =>
      m.AlgorithmsModule
    )
  },
  {
    path: 'combinatorics',
    loadChildren: () => import('@combinatorics/combinatorics.module').then(m =>
      m.CombinatoricsModule
    )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
