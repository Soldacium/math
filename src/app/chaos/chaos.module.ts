import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChaosComponent } from './chaos.component';
import { LorenzComponent } from './lorenz/lorenz.component';
import { SharedModule } from '@shared/shared.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { routes } from './chaos-routes';



@NgModule({
  declarations: [
    ChaosComponent,
    LorenzComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ChaosModule { }
