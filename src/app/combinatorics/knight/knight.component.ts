import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-knight',
  templateUrl: './knight.component.html',
  styleUrls: ['./knight.component.scss']
})
export class KnightComponent implements OnInit {

  canvasSize!: number;
  canvasBg!: HTMLCanvasElement;
  ctxBg!: CanvasRenderingContext2D;
  canvasPath!: HTMLCanvasElement;
  ctxPath!: CanvasRenderingContext2D;
  buttonsEl!: HTMLDivElement;
  canvasContainerEl!: HTMLDivElement;

  stopAnimation = false;
  startNode = [
    0, 0
  ];
  graph: Node[] = [];
  graphSize = 50;
  animationSpeed = 10;
  movementVector = [2, 1];
  movementVectors: number[][] = [
    [-2, 1], [-2, -1], [2, 1], [2, -1],
    [-1, 2], [-1, -2], [1, -2], [1, 2]
  ];
  jumpNum = 0;
  // #00ff8030
  fillColor = '#252525';
  lineColor = '#FF0090';
  strokeColor = 'rgb(0, 255, 128)';
  mouse = {
    x: 0,
    y: 0
  };

  constructor() { }

  ngOnInit(): void {
    this.addScrollLogic();
    this.initCanvas();
    this.animate();
    this.establishMovementVectors();
    this.makeNodes();
    this.drawGraph();
  }

  addScrollLogic(): void{
    this.buttonsEl = document.getElementById('buttons') as HTMLDivElement;
    this.canvasContainerEl = document.getElementById('canvas-container') as HTMLDivElement;
    console.log(this.canvasContainerEl);
    window.addEventListener('scroll', e => {
      const y = window.scrollY;
      const percent = y / window.innerHeight < 0.5 ? y / window.innerHeight  : 0.5;
      this.canvasContainerEl.style.transform = `scale(${1 - percent * 0.6})`;
      this.canvasContainerEl.style.left = `${30 - 25 * percent}%`;
      this.canvasContainerEl.style.top = `${15 + 20 * percent}%`;
      this.buttonsEl.style.left = `${50 - 40 * percent}%`;
      this.buttonsEl.style.top = `${10 + 20 * percent}%`;
    });
  }

  initCanvas(): void {
    this.canvasSize = window.innerHeight * 0.7;
    this.canvasBg = document.getElementById('canvas-bg') as HTMLCanvasElement;
    this.canvasPath = document.getElementById('canvas-path') as HTMLCanvasElement;

    this.ctxBg = this.canvasBg.getContext('2d') as CanvasRenderingContext2D;
    this.ctxPath = this.canvasPath.getContext('2d') as CanvasRenderingContext2D;

    this.canvasBg.width = this.canvasSize;
    this.canvasBg.height = this.canvasSize;
    this.canvasPath.width = this.canvasSize;
    this.canvasPath.height = this.canvasSize;

    this.canvasBg.addEventListener('mousemove', (event) => {
      this.mouse.x = event.x;
      this.mouse.y = event.y;
    });

    window.addEventListener('resize', () => {
      this.canvasSize = window.innerHeight * 0.7;
      this.canvasBg.width = this.canvasSize;
      this.canvasBg.height = this.canvasSize;
      this.canvasPath.width = this.canvasSize;
      this.canvasPath.height = this.canvasSize;
      this.drawGraph();
    });
  }

  animate(): void {
    requestAnimationFrame(() => {this.animate(); });
  }

  reset(): void {
    this.stopAnimation = true;
    this.fillColor = '#252525';
    this.establishMovementVectors();
    this.makeNodes();
    this.drawGraph();
    this.ctxPath.clearRect(0, 0, this.canvasSize, this.canvasSize);
  }

  establishMovementVectors(): void{
    this.movementVectors = [];
    for (let i = 0; i < 2; i++){
      for (let j = 0; j < 2; j++){
        for (let k = 0; k < 2; k++){
          const vector = [this.movementVector[0 + j] * Math.pow(-1, i), this.movementVector[1 - j] * Math.pow(-1, i + j + k)];
          this.movementVectors.push(vector);
        }
      }
    }
  }

  makeNodes(): void {
    this.graph = [];
    for (let x = 0; x < this.graphSize; x++) {
      for (let y = 0; y < this.graphSize; y++) {
        const dist = Math.sqrt(Math.pow(this.graphSize / 2 - x, 2) + Math.pow(this.graphSize / 2 - y, 2));
        const nodeConnections: number[][] = [];
        this.movementVectors.forEach(vector => {
          const connection: number[] = [];
          connection.push(x + vector[0]);
          connection.push(y + vector[1]);
          if (connection[0] >= 0 && connection[0] < this.graphSize &&
            connection[1] >= 0 && connection[1] < this.graphSize){
            nodeConnections.push(connection);
          }
        });
        const node: Node = this.newNode(x, y, dist, nodeConnections, 5, nodeConnections.length, true);
        this.graph.push(node);
      }
    }
  }

  newNode(
    x: number ,
    y: number,
    distance: number,
    nodeConnections: number[][],
    radius: number,
    activeConnections: number,
    isActive: boolean): Node {
    return {
      x,
      y,
      distance,
      nodeConnections,
      radius,
      activeConnections,
      isActive
    };
  }

  drawGraph(): void{
    const rectWidth = this.canvasBg.width / this.graphSize;
    for (let x = 0; x < this.canvasBg.width; x += rectWidth){
      for (let y = 0; y < this.canvasBg.width; y += rectWidth){
        this.drawGraphRect(x, y, x + rectWidth, y + rectWidth);
      }
    }
  }

  // wyłączmy obenego node na semym początu bo juz na nim jesteśmy
  // po kolei sprawdzamy punkty do których mozna isc z current node (obecnego miejsca)
  // sprawdzamy ilość możliwych połączeń danego node tylko jak jest aktywny
  // jezeli aktywne to zapisujemy
  // jezeli node sprawdzanego node ma dostępne któreś połączenie to dodajemy
  // odrazu mozna sprawdzic jak jego ilosc połączeń przedstawia się na tle innych
  // od początku sprawdzamy ile ten node ma obacnie dostępnych połącznień
  // po przejsciu tego procesu mamy listę aktywnych node'ow i zaktualizowaną listę ich dotępnych połączeń
  // szukamy wiec tego z najmniejszą liczbą połączeń, a jezeli są dwa to porownojemy ich odleglosci
  // w zaleznosci ile jest opcji skoku porownojemy dystans
  // rysujemy linię między wybranym z listy activeNode a currentNode

  async knightTour(){
    this.stopAnimation = false;
    this.jumpNum = 0;
    this.fillColor = '#6a6a6a';
    let activeNodes = this.graph.length;
    let currentNode = this.searchFor(this.startNode[0], this.startNode[1]); // obecne miejsce na planszy

    while (activeNodes > 0 && !this.stopAnimation){
      const activeNestedNodes: Node[] = [];
      let minimumConnections = 8;
      currentNode.isActive = false;
      currentNode.nodeConnections.forEach(toNode => {
        const check_1 = this.searchFor(toNode[0], toNode[1]);
        if (check_1.isActive === true){
          activeNestedNodes.push(check_1);
          check_1.activeConnections = 0;
          check_1.nodeConnections.forEach( toToNode => {
            const check_2 = this.searchFor(toToNode[0], toToNode[1]);
            if (check_2.isActive === true){
              check_1.activeConnections += 1;
            }
          });
          if (check_1.activeConnections < minimumConnections){
            minimumConnections = check_1.activeConnections;
          }
        }
      });

      const lastX = currentNode.x;
      const lastY = currentNode.y;
      const possibleNodes: Node[] = [];
      activeNestedNodes.forEach(node => {
        if (node.activeConnections === minimumConnections ){ // && node.distance == maximumDistance
          possibleNodes.push(node);
        }
        if (possibleNodes.length > 1){
          let maxMax = 0;
          possibleNodes.forEach(node => {
            if (node.distance > maxMax){
              maxMax = node.distance;
              currentNode = node;
            }
          });
        }else{
          currentNode = possibleNodes[0];
        }
      });
      activeNodes--;
      const nodeSize = this.canvasSize / this.graphSize ;
      const nodeCenter = nodeSize / 2;
      await this.wait(this.animationSpeed).then(res => {
        this.drawGraphRect(
          currentNode.x * nodeSize,
          currentNode.y * nodeSize,
          nodeSize,
          nodeSize);

        this.drawGraphLine(
          currentNode.x * nodeSize + nodeCenter,
          currentNode.y * nodeSize + nodeCenter,
          lastX * nodeSize + nodeCenter,
          lastY * nodeSize + nodeCenter);

      });
    }
  }

  drawGraphLine(x1: number, y1: number, x2: number, y2: number): void{
    this.jumpNum += 150 / (this.graphSize * this.graphSize);
    this.ctxPath.beginPath();
    this.ctxPath.strokeStyle = `hsl(${150 + this.jumpNum},100%,50%)`;
    this.ctxPath.lineWidth = 2;
    this.ctxPath.moveTo(x1, y1);
    this.ctxPath.lineTo(x2, y2);
    this.ctxPath.stroke();
    this.ctxPath.closePath();
  }

  drawGraphRect(x1: number, y1: number, width: number, height: number): void {
    this.ctxBg.beginPath();
    this.ctxBg.rect(x1, y1, width, height);
    this.ctxBg.fillStyle = this.fillColor;
    this.ctxBg.fill();
    this.ctxBg.strokeStyle = '#2e2e2e';
    this.ctxBg.stroke();
    this.ctxBg.closePath();
  }

  searchFor(x: number, y: number): Node{
    const nodeNumber = x * this.graphSize + y;
    return this.graph[nodeNumber];
  }

  wait(ms: number): Promise < any > {
    return new Promise(res => setTimeout(res, ms));
  }

}

export interface Node{
  x: number;
  y: number;
  nodeConnections: number[][];
  activeConnections: number;
  distance: number;
  radius: number;
  isActive: boolean;
}
