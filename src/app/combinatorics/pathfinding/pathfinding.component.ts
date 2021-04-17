import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pathfinding',
  templateUrl: './pathfinding.component.html',
  styleUrls: ['./pathfinding.component.scss']
})
export class PathfindingComponent implements OnInit {

  canvasSize!: number;
  canvasBg!: HTMLCanvasElement;
  ctxBg!: CanvasRenderingContext2D;
  canvasPath!: HTMLCanvasElement;
  ctxPath!: CanvasRenderingContext2D;
  buttonsEl!: HTMLDivElement;
  canvasContainerEl!: HTMLDivElement;

  stopAnimation = false;
  startCoordinates = [0, 0];
  endCoordinates = [16, 16];
  graph: Node[] = [];
  graphSize = 26;
  animationSpeed = 10;
  movementVector = [1, 1];
  movementVectors: number[][] = [
    // [1, 1], [-1, -1], [1, -1], [1, 1],
    [0, 1], [0, -1], [1, 0], [-1, 0],
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
    this.initCanvas();
    this.reset();
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
      this.fillColor = '#252525';
      this.drawGraph();
    });
  }

  animate(): void {
    requestAnimationFrame(() => {this.animate(); });
  }

  reset(): void {
    this.stopAnimation = true;
    this.fillColor = '#252525';
    // this.establishMovementVectors();
    this.makeNodes();
    this.drawGraph();
    this.ctxPath.clearRect(0, 0, this.canvasSize, this.canvasSize);
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
        const node: Node = this.newNode(x, y, dist, 0, nodeConnections, 5, nodeConnections.length, false, false);
        this.graph.push(node);
      }
    }
    this.redoNodeDistances();
  }

  redoNodeDistances(): void{
    this.graph.forEach(node => {
      node.distance = Math.sqrt(Math.pow(node.x - this.endCoordinates[0], 2) + Math.pow(node.y - this.endCoordinates[1], 2));
    });
  }

  makeRandomWalls(): void{

  }

  newNode(
    x: number ,
    y: number,
    distance: number,
    value: number,
    nodeConnections: number[][],
    radius: number,
    activeConnections: number,
    isSearched: boolean,
    isWall: boolean): Node {
    return {
      x,
      y,
      distance,
      nodeConnections,
      radius,
      activeConnections,
      isSearched,
      isWall,
      value
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

  async calcDijkstra(): Promise<void>{
    await this.dijkstra(this.startCoordinates, this.endCoordinates);
  }

  async dijkstra(startCoordinates: number[], endCoordinates: number[]): Promise<void> {
    this.fillColor = '#555555';
    const startNode = this.searchFor(startCoordinates[0], startCoordinates[1]);
    const endNode = this.searchFor(endCoordinates[0], endCoordinates[1]);
    startNode.value = 0;
    let found = false;
    let nodesToCheck: Node[] = [startNode]; // current place on map
    let potentialNodes: Node[] = [];
    const nodeSize = this.canvasSize / this.graphSize ;
    this.stopAnimation = false;

    while (!found && !this.stopAnimation){
      for (const node of nodesToCheck){
        node.isSearched = true;
        for (const connectedNodeCoordinates of node.nodeConnections){
          const connectedNode = this.searchFor(connectedNodeCoordinates[0], connectedNodeCoordinates[1]);
          if (connectedNode === endNode) {
            console.log('found!', connectedNode);
            found = true;
          }
          if (!connectedNode.isWall && !connectedNode.isSearched){
            await this.wait(this.animationSpeed).then(res => {
              connectedNode.value = node.value + 1;
              connectedNode.isSearched = true;
              this.drawGraphRect(
                connectedNode.x * nodeSize,
                connectedNode.y * nodeSize,
                nodeSize,
                nodeSize);
              potentialNodes.push(connectedNode);
            });
          }
        }
      }
      nodesToCheck = [...potentialNodes];
      potentialNodes = [];
    }
  }

  calcAStar(){

  }

  async aStar(startCoordinates: number[], endCoordinates: number[]): Promise<void>{
    this.fillColor = '#555555';
    const startNode = this.searchFor(startCoordinates[0], startCoordinates[1]);
    const endNode = this.searchFor(endCoordinates[0], endCoordinates[1]);
    startNode.value = 0;
    const found = false;
    const nodesToCheck: Node[] = [startNode]; // current place on map
    const potentialNodes: Node[] = [];
    const nodeSize = this.canvasSize / this.graphSize ;
    this.stopAnimation = false;
    while (!found && !this.stopAnimation){

    }
  }

  reverseRoad(endCoordinates: Array<number>, startNode: object): void {
    const currentNode = this.searchFor(endCoordinates[0], endCoordinates[1]);
    const stop = 0;
    let curCurrentNode;
    while (currentNode !== startNode && stop === 0 && currentNode.isSearched === true) {
        let minValue = currentNode.value;
        currentNode.nodeConnections.forEach(node => {
            const realNode = this.searchFor(node[0], node[1]);
            if (realNode.value < minValue) {
                curCurrentNode = realNode;
                minValue = realNode.value;
            }
        });

        // currentNode = curCurrentNode;
        // currentNode.isRoad = 1;
    }

  }

  searchFor(x: number, y: number): Node{
    const nodeNumber = x * this.graphSize + y;
    return this.graph[nodeNumber];
  }

  searchForNodes(value: number ): Node[] {
    const nextNodes: Node[] = [];
    this.graph.forEach(node => {
        if (node.value == value) {
            nextNodes.push(node);
        }
    });
    return nextNodes;
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
  value: number;
  radius: number;
  isSearched: boolean;
  isWall: boolean;
}
