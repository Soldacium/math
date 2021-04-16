import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-simple',
  templateUrl: './input-simple.component.html',
  styleUrls: ['./input-simple.component.scss']
})
export class InputSimpleComponent{

  @Input() placeholder = '';
  @Input() label = '';
  @Input() type: 'text'|'number'|'email'|'password'|'datetime-local' = 'text';
  @Input() darkMode = false;
  @Input() textColor = 'black';

  @Input() inputModel!: string | number;
  @Output() inputModelChange = new EventEmitter<string | number>();

}
