import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-knight',
  templateUrl: './knight.component.html',
  styleUrls: ['./knight.component.scss']
})
export class KnightComponent implements OnInit {

  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  canvasSize!: number;
  mouse = {
    x: 0,
    y: 0
  };
  graph: Node[] = [];
  graphSize = 8;
  animationSpeed = 10;
  movementVectors: number[][] = [
    [-2, 1], [-2, -1], [2, 1], [2, -1],
    [-1, 2], [-1, -2], [1, -2], [1, 2]
  ];
  jumpNum = 0;
  // #00ff8030
  fillColor = '#4a4a4a';
  lineColor = '#FF0090';
  strokeColor = 'rgb(0, 255, 128)';

  startNode = [
    0, 0
  ];

  buttonsEl!: HTMLDivElement;

  constructor() { }

  ngOnInit(): void {
    this.initCanvas();
    this.animate();
    this.makeNodes();
    this.drawGraph();
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

    window.addEventListener('resize', () => {
      this.canvasSize = window.innerHeight * 0.7;
      this.canvas.width = this.canvasSize;
      this.canvas.height = this.canvasSize;
      this.drawGraph();
    });
  }

  reset(){
    this.makeNodes();
    this.drawGraph();
  }

  addScrollLogic(): void{
    this.buttonsEl = document.getElementById('buttons') as HTMLDivElement;
    window.addEventListener('scroll', e => {
      const y = window.scrollY;
      const percent = y / window.innerHeight < 0.5 ? y / window.innerHeight  : 0.5;
      this.canvas.style.transform = `scaleY(-1) scale(${1 - percent})`;
      this.canvas.style.left = `${20 - 40 * percent}%`;
      this.buttonsEl.style.left = `${50 - 40 * percent}%`;
      this.buttonsEl.style.top = `${10 + 20 * percent}%`;
    });
  }

  animate(): void {
    requestAnimationFrame(() => {this.animate(); });
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.ctx.fillText('HTML CANVAS TEMPLATE' , this.mouse.x, this.mouse.y);
  }
  // oblicz dystans tego node od centrum
  // wyznacz połączone nody
  // uzyj wektorów by sprawdzic ktore skoki rycerza są mozliwe
  // dla każdego wektora, spróbuj skoczyć o ten wektor
  // koordynaty połączenia, x w [0], y w [1]
  // jeżeli połączenie jest z intniejącym elementem planszy, dodaj do listy połączeń (pola oznaczone od 0 do size-1)
  // stwórz obiekt node i dodaj go do listy node'ów
  makeNodes(): void {
    this.graph = [];
    for (let x = 0; x < this.graphSize; x++) {
      for (let y = 0; y < this.graphSize; y++) {
        const dist = Math.sqrt(Math.pow(this.graphSize/2 - x, 2) + Math.pow(this.graphSize/2 - y, 2));
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
        const node: Node = {
          x,
          y,
          distance: dist,
          nodeConnections,
          radius: 5,
          activeConnections: nodeConnections.length,
          isActive: true
        };
        this.graph.push(node);
      }
    }
    console.log(this.graph);
  }

  drawGraph(): void{
    const rectWidth = this.canvas.width / this.graphSize;
    for (let x = 0; x < this.canvas.width; x += rectWidth){
      for (let y = 0; y < this.canvas.width; y += rectWidth){
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
    this.jumpNum = 0;
    // this.fillColor = '#ffffff'
    let activeNodes = this.graph.length;
    let currentNode = this.searchFor(this.startNode[0], this.startNode[1]); // obecne miejsce na planszy

    while (activeNodes > 0){
      const activeNestedNodes: Node[] = [];
      let minimumConnections = 8;
      currentNode.isActive = false;

      currentNode.nodeConnections.forEach(toNode => {
        const check_1 = this.searchFor(toNode[0], toNode[1]);

        if (check_1.isActive == true){
          activeNestedNodes.push(check_1);
          check_1.activeConnections = 0;

          check_1.nodeConnections.forEach( toToNode => {
            const check_2 = this.searchFor(toToNode[0], toToNode[1]);

            if (check_2.isActive == true){
              check_1.activeConnections += 1;
            }
          });
          if (check_1.activeConnections < minimumConnections){
            minimumConnections = check_1.activeConnections;
          }
        }
      });

      const lastX = currentNode.x, lastY = currentNode.y;

      const kandydaci: Node[] = [];
      activeNestedNodes.forEach(node => {
        if (node.activeConnections === minimumConnections ){ // && node.distance == maximumDistance
          kandydaci.push(node);
      }
      // console.log(activeNestedNodes,minimumConnections)
        if (kandydaci.length > 1){
          let maxMax = 0;
          kandydaci.forEach(node => {
            if (node.distance > maxMax){
              maxMax = node.distance;
              currentNode = node;
            }
          });
        }else{
          currentNode = kandydaci[0];
        }
      });
      activeNodes--;
      const nodeSize = this.canvas.width / this.graphSize ;
      const nodeCenter = nodeSize / 2;
      await this.wait(this.animationSpeed).then(res => {
        /*
        this.drawGraphRect(
          currentNode.x * nodeSize,
          currentNode.y * nodeSize,
          lastX * nodeSize,
          lastY * nodeSize);
          */
        this.drawGraphLine(
          currentNode.x * nodeSize + nodeCenter,
          currentNode.y * nodeSize + nodeCenter,
          lastX * nodeSize + nodeCenter,
          lastY * nodeSize + nodeCenter);        
      });
    }
  }

  drawGraphLine(x1: number, y1: number, x2: number, y2: number): void{
    this.jumpNum += 0.1;
    this.ctx.beginPath();
    this.ctx.strokeStyle = `hsl(${this.jumpNum},100%,50%)`;
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawGraphRect(x1: number, y1: number, x2: number, y2: number): void {
    this.ctx.beginPath();
    this.ctx.rect(x1, y1, x2, y2);
    this.ctx.fillStyle = this.fillColor;
    this.ctx.fill();
    this.ctx.strokeStyle = '#000000';
    this.ctx.stroke();
    this.ctx.closePath();
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
