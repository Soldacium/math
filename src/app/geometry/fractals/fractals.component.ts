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
  lineWidth = 20;
  branchHeight = 130;
  branchAngle = 45;
  maxDepth = 6;
  currentDepth = 0;

  loading = false;

  constructor() { }

  ngOnInit(): void {
    this.initCanvas();
    this.loading = true;
    this.drawBranches(this.canvasSize / 2, this.canvasSize / 1.5, this.branchHeight, this.branchAngle, this.lineWidth,  0, 255, 128);
  }

  pickCategory(category: string): void{
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
    this.canvasSize = window.innerHeight * 1.4;
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

  async tree(): Promise<void>{
    this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);
    this.loading = true;
    console.log(this.loading);
    await this.drawBranches(this.canvasSize / 2, this.canvasSize / 1.5, this.branchHeight, this.branchAngle, this.lineWidth,  0, 255, 128)
    .then(res => { console.log(this.loading); this.loading = false; });
  }

  async drawBranches(startX: number, startY: number, len: number, angle: number, branchWidth: number, r: number, g: number, b: number):
  Promise<void> {
    this.ctx.beginPath();
    this.ctx.save();
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = branchWidth;
    this.ctx.fillStyle = `rgb(${r},${g},${b})`;
    this.ctx.strokeStyle = `rgb(${r},${g},${b})`;
    this.ctx.translate(startX, startY);
    this.ctx.rotate(angle * Math.PI / 180);
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, -len);
    this.ctx.stroke();

    if (len < this.maxDepth) {
      this.ctx.restore();
      return;
    }

    if (len > this.maxDepth){
      this.drawBranches(0, -len, len * 0.8, angle, branchWidth * 0.8, r - 1, g, b + 7);
      this.drawBranches(0, -len, len * 0.8, -angle, branchWidth * 0.8, r, g - 2, b + 10);
    }

    this.ctx.restore();
  }

  animate(): void {
    requestAnimationFrame(() => {this.animate(); });
  }

  wait(ms: number): Promise < any > {
    return new Promise(res => setTimeout(res, ms));
  }

}
