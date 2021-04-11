import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit {
  arraySize = 100;
  dummyArray: number[] = new Array(this.arraySize).fill(0);
  valueArray: number[] = new Array(this.arraySize).fill(0);

  constructor() { }

  ngOnInit(): void {
    this.valueArray = this.valueArray.map(x => Math.floor(Math.random() * 100))
  }

  resetArray(): void {
    this.randomizeSingleValue(this.valueArray.length);
  }

  randomizeSingleValue(index: number): void {
    if (index > 0) {
      setTimeout(() => {
        this.valueArray[index] = Math.floor(Math.random() * 100);
        return this.randomizeSingleValue(index - 1);
      }, 15);
    }
  }

  // "needs" recursion for animations
  bubbleSort(){
    for(let i = 0; i < this.arraySize; i--){

    }
  }

  bubble(index: number, highestValue: number){
    if(index > 2){
      if(highestValue < this.valueArray[index]){
        highestValue = this.valueArray[index]
      }

      setTimeout(() => {
        this.bubble(index - 1, highestValue);
      }, 10);

    }

  }
}
