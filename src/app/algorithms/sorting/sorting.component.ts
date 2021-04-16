import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit {

  arraySize = 100;
  animationSpeed = 50;
  transitionSpeed = 0.3;
  swaps = 0;
  stopAnimation = true;
  activeColumns = [-1, -1];
  dummyArray: number[] = new Array(this.arraySize).fill(0);
  valueArray: number[] = new Array(this.arraySize).fill(0);
  arrayEl!: HTMLDivElement;
  optionsEl!: HTMLDivElement;
  buttonsEl!: HTMLDivElement;

  constructor() { }

  ngOnInit(): void {
    this.valueArray = this.valueArray.map(x => Math.floor(Math.random() * 100));
    this.addScrollLogic();
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

  reinitializeArrays(): void{
    this.setBasicState();
    this.valueArray = new Array(this.arraySize).fill(0).map(x => Math.floor(Math.random() * 100));
    this.dummyArray = new Array(this.arraySize).fill(0);
  }

  resetArray(): void {
    this.setBasicState();
    this.randomizeSingleValue(this.valueArray.length);
  }

  setBasicState(): void {
    this.activeColumns = [-1, -1];
    this.stopAnimation = true;
    this.swaps = 0;
  }

  randomizeSingleValue(index: number): void {
    if (index >= 0) {
      this.wait(26 - this.arraySize / 7).then(res => {
        this.valueArray[index] = Math.floor(Math.random() * 100);
        this.activeColumns[0] = index;
        return this.randomizeSingleValue(index - 1);
      });
    }else{
      this.activeColumns[0] = -1;
    }
  }

  // "needs" recursion for animations
  async bubbleSort(): Promise<void>{
    for (let i = this.arraySize; i > 0; i--){
      if (!this.stopAnimation){
        await this.bubble(i);
      }
    }
  }

  async bubble(maxIndex: number): Promise<void>{
    for (let i = 0; i < maxIndex; i++) {
      if (this.valueArray[i + 1] < this.valueArray[i]){
        await this.swap(this.valueArray, i, i + 1);
      }
    }
  }

  async quickSort(items: number[], left: number, right: number): Promise<number[]> {
    let index = 0;
    if (items.length > 1 && this.stopAnimation === false) {
      index = await this.partition(items, left, right); // index returned from partition
      if (left < index - 1) { // more elements on the left side of the pivot
        await this.quickSort(items, left, index - 1);
      }
      if (index < right) { // more elements on the right side of the pivot
        await this.quickSort(items, index, right);
      }
    }
    return items;
  }

  async partition(items: number[], left: number, right: number): Promise<number> {
    const pivot   = items[Math.floor((right + left) / 2)]; // middle element
    let i = left; // left pointer
    let j = right; // right pointer
    const loop = async () => {
      while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            await this.swap(items, i, j); // swap two elements
            i++;
            j--;
        }
      }
    };

    return loop().then(res => i);
  }

  getMergedArray(items: number[]): void{
    this.mergeSort(items).then(res => this.valueArray = res);
  }

  async mergeSort(items: number[]): Promise< number[] > {
    if (items.length <= 1) {
      return items;
    }
    const mid = Math.floor(items.length / 2);
    const left = await this.mergeSort(items.slice(0, mid));
    const right = await this.mergeSort(items.slice(mid));
    return this.merge(left, right);
  }

  async merge(slice1: number[], slice2: number[]): Promise<number[]> {
    const sorted: number[] = [];
    while (slice1.length && slice2.length) {
      await this.wait(0).then(res => {
        this.swaps += 1;
        if (slice1[0] < slice2[0]) {
          sorted.push(slice1.shift() as number);
        } else {
          sorted.push(slice2.shift() as number);
        }
      });
    }
    return sorted.concat(slice1.slice().concat(slice2.slice()));
  }

  async swap(items: number[], leftIndex: number, rightIndex: number): Promise < void > {
    const temp = items[leftIndex];
    return this.wait(this.animationSpeed).then(res => {
      items[leftIndex] = items[rightIndex];
      items[rightIndex] = temp;
      this.activeColumns[0] = leftIndex;
      this.activeColumns[1] = rightIndex;
      this.swaps += 1;
    });
  }

  wait(ms: number): Promise < any > {
    return new Promise(res => setTimeout(res, ms));
  }

}
