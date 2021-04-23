import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fractals',
  templateUrl: './fractals.component.html',
  styleUrls: ['./fractals.component.scss']
})
export class FractalsComponent implements OnInit {

  buttonsEl!: HTMLDivElement;
  optionsEl!: HTMLDivElement;
  arrayEl!: HTMLDivElement;

  mouse = {
    x: 0,
    y: 0
  };
  animationSpeed = 10;
  canvasSize = 0;
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  backgroundColor = '#272727';
  circleColor = '#00ff80';
  categories = ['Bubble sort', 'Quick sort', 'Merge sort', 'Selection sort'];
  category = this.categories[0];

  constructor() { }

  ngOnInit(): void {
  }

  pickCategory(category: string){
    this.category = category;
  }

  chosenCategory(category: string): boolean{
    return this.category === category;
  }

  addScrollLogic(): void{
    this.buttonsEl = document.getElementById('buttons') as HTMLDivElement;
    this.optionsEl = document.getElementById('options') as HTMLDivElement;
    this.arrayEl = document.getElementById('array') as HTMLDivElement;
    window.addEventListener('scroll', e => {
      const y = window.scrollY;
      const percent = y / window.innerHeight < 0.5 ? y / window.innerHeight  : 0.5;
      this.arrayEl.style.transform = `scaleY(-1) scale(${1 - percent * 0.8})`;
      this.arrayEl.style.left = `${25 - 40 * percent}%`;
      this.buttonsEl.style.left = `${50 - 40 * percent}%`;
      this.buttonsEl.style.top = `${10 + 20 * percent}%`;
    });
  }

  initCanvas(): void {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.canvasSize = window.innerHeight * 0.7;
    this.canvas.width = this.canvasSize;
    this.canvas.height = this.canvasSize;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.canvas.addEventListener('mousemove', (event) => {
      this.mouse.x = event.x;
      this.mouse.y = event.y;
    });
  }

  reset(): void {

  }

  tree(): void{

  }

  animate(): void {
    requestAnimationFrame(() => {this.animate(); });
  }

}
