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
  }

  start(){

  }

  reset(){

  }

  drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number){
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    ctx.closePath();
  }

  animate(): void {
    requestAnimationFrame(() => {this.animate(); });
    this.timer++;
    if(this.timer % this.fillSpeed === 0){
      for(let i = 0; i < this.circlesAtOnce; i++){
        const x = Math.floor(Math.random() * this.canvasSize);
        const y = Math.floor(Math.random() * this.canvasSize);
        if(Math.pow(x - (this.canvasSize / 2),2) + Math.pow(y - (this.canvasSize / 2),2) < Math.pow(this.canvasSize/2, 2)){
          this.inside += 1;
        }else{
          this.outside += 1;
        }
        this.total += 1;
        this.addCircle(x,y,0,4,this.ctx);        
      }

    }
    this.drawCircle(this.ctx, this.canvasSize / 2, this.canvasSize / 2, this.canvasSize / 2);
  }

  async addCircle(x: number, y: number, radius: number, maxRadius: number, ctx: CanvasRenderingContext2D){
    if(radius < maxRadius){
      await this.wait(this.animationSpeed).then(res => this.drawSphere(x,y,radius,ctx));
      this.addCircle(x,y,radius + 0.2,maxRadius,ctx);
      console.log('hey')
    }
  }

  drawSphere(x: number, y: number, radius: number, ctx: CanvasRenderingContext2D){
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fillStyle = this.circleColor;
    ctx.fill();
  }

  wait(ms: number): Promise < any > {
    return new Promise(res => setTimeout(res, ms));
  };

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