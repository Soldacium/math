/*
import { Injectable } from '@angular/core';
import { Utilities } from './utilities.service';
// tslint:disable

@Injectable()
export class AAlgorithm {

  Utilities = new Utilities;
  constructor() { }

  calcPath(graph: Array<object>, startCoordinates: Array<number>, endCoordinates: Array<number>, endNode: object, startNode: object, searchSpeed: number) {
    
    this.Utilities.searchFor(graph, startCoordinates[0], startCoordinates[1]).value = 0;

    let pathLen = 0;
    let found = false;
    let NodesToCheck = this.Utilities.searchForNodes(graph, pathLen); // current place on map

    while (found == false) {
        NodesToCheck.forEach(node => {
            const nodesCoords = node.nodeConnections;
            const nodesConnected = [];

            nodesCoords.forEach(coordinates => {
                nodesConnected.push(this.Utilities.searchFor(graph ,coordinates[0], coordinates[1]));
            });

            nodesConnected.forEach(connected => {

                if (connected.value === undefined &&
                    connected !== endNode &&
                    connected.isActive !== 0) {
                        new Promise((resolve, _reject) => {

                            setTimeout(() => resolve([
                            connected.isActive = 2,
                            connected.animate = -0
                            ]), pathLen * searchSpeed);
                        });
                    connected.value = pathLen + 1;


                } else if (connected == endNode ) {
                    new Promise((resolve, _reject) => {
                        setTimeout(() => resolve([
                        connected.isActive = 2,
                        connected.animate = -0
                        ]), pathLen * searchSpeed);
                    });
                    connected.value = pathLen + 1;
                    found = true;

              
                    new Promise((resolve, _reject) => {
                        setTimeout(() => resolve(
                        [ this.reverseRoad(graph,endCoordinates,startNode)]
                        ), pathLen * searchSpeed);
                    });
                }
            });
        });
        pathLen++;
        NodesToCheck = this.Utilities.searchForNodes(graph, pathLen);
    }
  }





  reverseRoad(graph: Array<object>, endCoordinates: Array<number>, startNode: object) {
    let currentNode = this.Utilities.searchFor(graph,endCoordinates[0], endCoordinates[1]);
    const stop = 0;
    let curCurrentNode;


    while (currentNode != startNode && stop == 0 && currentNode.isActive == 2) {
        let minValue = currentNode.value;

        currentNode.nodeConnections.forEach(node => {
            const realNode = this.Utilities.searchFor(graph,node[0], node[1]);

            if (realNode.value < minValue) {
                curCurrentNode = realNode;
                minValue = realNode.value;
            }
        });

        currentNode = curCurrentNode;
        currentNode.isRoad = 1;
    }

  }
}
*/