import { Component, OnInit } from '@angular/core';
import { atan2, chain, derivative, e, evaluate, log, pi, pow, round, sqrt } from 'mathjs';

@Component({
  selector: 'app-lorenz',
  templateUrl: './lorenz.component.html',
  styleUrls: ['./lorenz.component.scss']
})
export class LorenzComponent implements OnInit {

  rho = 28.0;
  sigma = 10.0;
  beta = 8.0 / 3.0;

  constructor() { }

  ngOnInit(): void {
    const sortedArray = [1, 2, 2, 3, 6, 10, 20, 124, 1642, 123124];
    const searchedNumberIndex = this.binarySearch(sortedArray, 0, sortedArray.length - 1, 3);
    this.calculateEquations();
  }

  binarySearch(arr: number[], leftIndex: number, rightIndex: number, searchedNumber: number): number{
    if (rightIndex >= leftIndex) {
        const mid = Math.floor(leftIndex + (rightIndex - leftIndex) / 2);
        if (arr[mid] === searchedNumber){
          return mid;
        }

        if (arr[mid] > searchedNumber){
          return this.binarySearch(arr, leftIndex, mid - 1, searchedNumber);
        }

        return this.binarySearch(arr, mid + 1, rightIndex, searchedNumber);
    }
    return -1;
  }

  equation(x: number, y: number, z: number){
    return {
      x: this.sigma * (y - x),
      y: x * (this.rho - z) - y,
      z: x * y - this.beta * z};
  }

  calculateEquations(){
    const start = {x: 2, y: 1, z: 1};
    for (let i = 0; i < 0.5; i += 0.01){

      console.log(this.equation(start.x + i, start.y + i, start.z + i));
    }
  }


}
