import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionsComponent } from './components/options/options.component';
import { InputRangeComponent } from './components/input-range/input-range.component';
import { FormsModule } from '@angular/forms';
import { DescriptionComponent } from './components/description/description.component';
import { CodeComponent } from './components/code/code.component';
import { ContentComponent } from './components/content/content.component';
import { ButtonStrokedDirective } from './directives/button-stroked.directive';
import { ButtonFlatDirective } from './directives/button-flat.directive';
import { InputSimpleComponent } from './components/input-simple/input-simple.component';

@NgModule({
  declarations: [
    OptionsComponent,
    InputRangeComponent,
    DescriptionComponent,
    CodeComponent,
    ContentComponent,
    ButtonStrokedDirective,
    ButtonFlatDirective,
    InputSimpleComponent,

  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    OptionsComponent,
    InputRangeComponent,
    InputSimpleComponent,
    DescriptionComponent,
    CodeComponent,
    ContentComponent,
    ButtonStrokedDirective,
    ButtonFlatDirective
  ]
})
export class SharedModule { }
