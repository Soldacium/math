import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { FractalsComponent } from './fractals/fractals.component';
import { GeometryComponent } from './geometry.component';
import { RouterModule } from '@angular/router';
import { routes } from './geometry-routes';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    WelcomeComponent,
    FractalsComponent,
    GeometryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class GeometryModule { }
