import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mc',
  templateUrl: './mc.component.html',
  styleUrls: ['./mc.component.scss']
})
export class McComponent implements OnInit {

  fillSpeed = 5;
  animationSpeed = 10;
  circlesAtOnce = 1;
  circleRadius = 4;
  stopAnimation = false;

  mouse = {
    x: 0,
    y: 0
  };

  timer = 0;

  canvasSize = 0;
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  backgroundColor = '#272727';
  circleColor = '#00ff80';

  circleArray = [];
  inside = 0;
  outside = 0;
  total = 0;

  constructor() { }

  ngOnInit(): void {
    this.initCanvas();
    this.animate();
  }

  initCanvas(): void {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.canvasSize = window.innerHeight * 0.6;
    this.canvas.width = this.canvasSize;
    this.canvas.height = this.canvasSize;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.canvas.addEventListener('mousemove', (event) => {
      this.mouse.x = event.x;
      this.mouse.y = event.y;
    });

    this.canvas.addEventListener('mouseup', (event) => {
      const x = event.x - this.canvas.offsetLeft;
      const y = event.y - this.canvas.offsetTop;
      if (Math.pow(x - (this.canvasSize / 2), 2) + Math.pow(y - (this.canvasSize / 2), 2) < Math.pow(this.canvasSize / 2, 2)){
        this.inside += 1;
      }else{
        this.outside += 1;
      }
      this.total += 1;
      this.addDisc(x, y, 0, this.circleRadius, this.ctx);
    });
  }

  start(): void{
    this.stopAnimation = false;
  }

  stop(): void{
    this.stopAnimation = true;
  }

  reset(): void {
    this.stopAnimation = true;
    this.inside = 0;
    this.outside = 0;
    this.total = 0;
    this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);
  }

  animate(): void {
    requestAnimationFrame(() => {this.animate(); });
    this.timer++;
    if (this.timer % this.fillSpeed === 0 && !this.stopAnimation){
      for (let i = 0; i < this.circlesAtOnce; i++){
        const x = Math.floor(Math.random() * this.canvasSize);
        const y = Math.floor(Math.random() * this.canvasSize);
        if (Math.pow(x - (this.canvasSize / 2), 2) + Math.pow(y - (this.canvasSize / 2), 2) < Math.pow(this.canvasSize / 2, 2)){
          this.inside += 1;
        }else{
          this.outside += 1;
        }
        this.total += 1;
        this.addDisc(x, y, 0, this.circleRadius, this.ctx);
      }
    }
    this.drawCircle(this.ctx, this.canvasSize / 2, this.canvasSize / 2, this.canvasSize / 2);
  }

  drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number): void{
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    ctx.closePath();
  }

  async addDisc(x: number, y: number, radius: number, maxRadius: number, ctx: CanvasRenderingContext2D): Promise<void>{
    if (radius < maxRadius){
      await this.wait(this.animationSpeed).then(res => this.drawDisc(x, y, radius, ctx));
      this.addDisc(x, y, radius + 0.2, maxRadius, ctx);
    }
  }

  drawDisc(x: number, y: number, radius: number, ctx: CanvasRenderingContext2D): void{
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fillStyle = this.circleColor;
    ctx.fill();
  }

  wait(ms: number): Promise < any > {
    return new Promise(res => setTimeout(res, ms));
  }

}
/*
class Circle {
  x = 0;
  y = 0;
  radius = 0;
  minRadius = 0;
  colorArray = [
    'hsl(356, 84%, 41%)',
    'hsl(208, 100%, 56%)',
    'hsl(346, 84%, 61%)',
    'hsl(326, 94%, 51%)',
  ];
  constructor(x: number, y: number, radius: number, minRadius: number, private ctx: CanvasRenderingContext2D){
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.minRadius = minRadius;
  }


  draw(){
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.closePath();
    this.ctx.fillStyle = 'green';
    this.ctx.fill();
  };

  update(){
    this.x += 0.001;
    this.y += 0.001;
    this.draw();
  }
}
*/
