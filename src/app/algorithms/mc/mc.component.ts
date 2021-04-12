import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mc',
  templateUrl: './mc.component.html',
  styleUrls: ['./mc.component.scss']
})
export class McComponent implements OnInit {

  mouse = {
    x: 0,
    y: 0
  };

  canvasSize = 0;
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  circleArray = [];
  inside = 0;
  outside = 0;

  constructor() { }

  ngOnInit(): void {
    this.initCanvas();
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

    this.drawCircle(this.ctx, this.canvasSize/2,this.canvasSize/2, this.canvasSize)
  }

  drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number){
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'white';
    ctx.stroke();
  }

  start(){

  }

  reset(){

  }

}
