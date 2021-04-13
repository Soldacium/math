import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-range',
  templateUrl: './input-range.component.html',
  styleUrls: ['./input-range.component.scss']
})
export class InputRangeComponent implements OnInit {

  @Input()
  min!: number;

  @Input()
  max!: number;

  @Input()
  value!: number;

  @Input()
  step = 1;

  @Output() onclick:
  EventEmitter<Event> = new EventEmitter<Event>();

  @Input() inputModel = 0;
  @Output() inputModelChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.min,this.max)
  }

}
