import { Component, OnInit } from '@angular/core';
import { Node } from '@shared/models/node.model';

@Component({
  selector: 'app-euler-cycle',
  templateUrl: './euler-cycle.component.html',
  styleUrls: ['./euler-cycle.component.scss']
})
export class EulerCycleComponent implements OnInit {

  graph: Node[] = [];
  graphSize = 3;
  numOfNodes = Math.pow(this.graphSize, 2);
  movementVectors: number[][] = [
    [0, 1], [0, -1], [1, 0], [-1, 0],
  ];
  animationSpeed = 10;

  constructor() { }

  ngOnInit(): void {
    this.makeEmptyDisconnectedGraph();
    this.makeEvenDegreeNode(this.graph[0]);
    const newGraph: Node[] = [];
    console.log(this.graph);
    /*
    this.graph.forEach(node => {
      newGraph.push({...node})
    })

    this.hierholzerAlgorithm(newGraph)
    */
  }

  reset(){
    this.numOfNodes = Math.pow(this.graphSize, 2);
  }

  makeEvenDegreeNode(node: Node){
    if (node.activeConnections % 2 !== 0 || node.activeConnections === 0){
      const newNodeConnections: Node[] = [];
      let i = (node.x * this.graphSize + node.y + 1) % this.numOfNodes;
      console.log(i);
      while (newNodeConnections.length < 2){
        i %= this.numOfNodes;
        const nextNode = this.graph[i];
        newNodeConnections.push(nextNode);
        
        if (nextNode === node){
          i++;
          return;
        }
        node.nodeConnections.forEach(connection => {
          if (nextNode.x === connection[0] && nextNode.y === connection[1]){
            newNodeConnections.splice(newNodeConnections.length - 1);
          }
        });
        i++;
      }

      newNodeConnections.forEach(newNodeConnection => {
        newNodeConnection.nodeConnections.push([node.x, node.y]);
        node.nodeConnections.push([newNodeConnection.x, newNodeConnection.y]);
        node.activeConnections += 1;
        newNodeConnection.activeConnections += 1;
      });

      newNodeConnections.forEach(noden => {
        this.makeEvenDegreeNode(noden);
      });
    }

  }

  /*
  makeEvenDegreeNode(node: Node, initialPosition: number){
    if (node.activeConnections % 2 !== 0 || node.activeConnections === 0){
      const connections: Node[] = [];
      let i = initialPosition;
      while (connections.length !== (2)){
        let ok = true;
        const possibleNode = this.graph[i % this.numOfNodes];
        if (possibleNode === node){
          i++;
          return;
        }
        console.log('\n');
        possibleNode.nodeConnections.forEach(connectionCoords => {
          if (
            connectionCoords[0] === node.x &&
            connectionCoords[1] === node.y){
              ok = false;
            }
        });
        node.nodeConnections.forEach(connectionCoords => {

          console.log([...node.nodeConnections], [...possibleNode.nodeConnections]);
          console.log(connectionCoords[0] === possibleNode.x && connectionCoords[1] === possibleNode.y, possibleNode.x, possibleNode.y);

          if (
            connectionCoords[0] === possibleNode.x &&
            connectionCoords[1] === possibleNode.y ){
            ok = false;

            return;

          }
        });
        if (ok === true){
          connections.push(possibleNode);
        }
        i++;
      }
      console.log([...node.nodeConnections], connections)
      node.activeConnections += connections.length;
      if (connections.length > 0){
        connections.forEach((connection, i) => {
          node.nodeConnections.push([connection.x, connection.y]);
          connection.nodeConnections.push([node.x, node.y]);
          connection.activeConnections += 1;
          this.makeEvenDegreeNode(connection, (initialPosition + i + 1) % 9);
        });
      }
    }
  }
  */

  makeEmptyDisconnectedGraph(){
    this.graph = [];
    for (let x = 0; x < this.graphSize; x++) {
      for (let y = 0; y < this.graphSize; y++) {
        const dist = Math.sqrt(Math.pow(this.graphSize / 2 - x, 2) + Math.pow(this.graphSize / 2 - y, 2));
        const nodeConnections: number[][] = [];
        const node: Node = this.newNode(x, y, dist, nodeConnections, 5, nodeConnections.length);
        this.graph.push(node);
      }
    }
    console.log(this.graph);
  }

  detectAndRemoveCycle(graph: Node[], node: Node, cycleNodes: Node[]): Node[]{

    const nextNode = this.searchFor(graph, node.nodeConnections[0][0], node.nodeConnections[0][1]);

    console.log(node, nextNode);
    cycleNodes.push(nextNode);
    node.nodeConnections.splice(0, 1);
    node.activeConnections -= 1;
    let isConnectedToStart = false;
    nextNode.nodeConnections.forEach(connection => {
      if (connection[0] === cycleNodes[0].x && connection[1] === cycleNodes[0].y){
        isConnectedToStart = true;
        nextNode.nodeConnections = nextNode.nodeConnections.filter(connection => !(connection[0] === cycleNodes[0].x && connection[1] === cycleNodes[0].y));
        nextNode.activeConnections -= 1;
      }
    });
    if (!isConnectedToStart || cycleNodes.length < 3){
      nextNode.nodeConnections = nextNode.nodeConnections.filter(connection => !(connection[0] === node.x && connection[1] === node.y));
      nextNode.activeConnections -= 1;
      this.detectAndRemoveCycle(graph, nextNode, cycleNodes);
    }

    return cycleNodes;
  }

  hierholzerAlgorithm(graph: Node[]){
    const cycle = this.detectAndRemoveCycle(graph, graph[0], [graph[0]]);

    console.log(cycle, graph);
  }

  newNode(
    x: number ,
    y: number,
    distance: number,
    nodeConnections: number[][],
    radius: number,
    activeConnections: number): Node {
    return {
      x,
      y,
      distance,
      nodeConnections,
      radius,
      activeConnections,
      value: 0
    };
  }

  searchFor(graph: Node[], x: number, y: number): Node{
    const graphSize = Math.sqrt(graph.length);
    const nodeNumber = x * graphSize + y;
    return graph[nodeNumber];
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

  wait(ms: number): Promise < any > {
    return new Promise(res => setTimeout(res, ms));
  }

}
