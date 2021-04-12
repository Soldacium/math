import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hanoi',
  templateUrl: './hanoi.component.html',
  styleUrls: ['./hanoi.component.scss']
})
export class HanoiComponent implements OnInit {

  animationSpeed = 10;
  numberOfCircles = 10;
  moves = 0;
  towerA: number[] = [];
  towerB: number[] = [];
  towerC: number[] = [];
  stopAnimation = false;

  constructor() { }

  ngOnInit(): void {
    this.initializeTowers();
  }

  initializeTowers(): void{
    this.stopAnimation = true;
    this.moves = 0;
    this.towerA = new Array(this.numberOfCircles).fill(0).map((x, i) => i);
    this.towerB = [];
    this.towerC = [];

  }

  startHanoi(){
    this.initializeTowers();
    this.stopAnimation = false;
    this.hanoi(this.numberOfCircles, this.towerA, this.towerB, this.towerC);
  }

  async hanoi(n: number, A: number[], B: number[], C: number[]){
    if (n > 0 && !this.stopAnimation){
      await this.wait(this.animationSpeed).then(res => this.hanoi(n - 1, A, C, B));
      // console.log(`moving ${A} -> ${C}`);
      C.unshift(A.shift() || 0);
      this.moves += 1;
      await this.wait(this.animationSpeed).then(res => this.hanoi(n - 1, B, A, C));
      
    }
  }

  wait(ms: number): Promise < any > {
    return new Promise(res => setTimeout(res, ms));
  }

}
