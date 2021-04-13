import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionsComponent } from './components/options/options.component';
import { InputRangeComponent } from './components/input-range/input-range.component';
import { ExplanationComponent } from './components/explanation/explanation.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OptionsComponent,
    InputRangeComponent,
    ExplanationComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    OptionsComponent,
    InputRangeComponent,
    ExplanationComponent
  ]
})
export class SharedModule { }
