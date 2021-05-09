export interface Node{
    x: number;
    y: number;
    nodeConnections: number[][];
    activeConnections: number;
    distance: number;
    value: number;
    radius: number;
}