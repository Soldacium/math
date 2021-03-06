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
  categories = ['Bubble sort', 'Insertion sort', 'Selection sort', 'Heap sort', 'Shell sort', 'Quick sort', 'Merge sort'];
  category = this.categories[0];

  constructor() { }

  ngOnInit(): void {
    this.valueArray = this.valueArray.map(x => Math.floor(Math.random() * 100));
    this.addScrollLogic();

    const testArr = [1, -6, 214, 34, 51, 345];
    this.shellSort(testArr, testArr.length);
    console.log(testArr);
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
      index = await this.partition(items, left, right);
      if (left < index - 1) {
        await this.quickSort(items, left, index - 1);
      }
      if (index < right) {
        await this.quickSort(items, index, right);
      }
    }
    return items;
  }

  async partition(items: number[], left: number, right: number): Promise<number> {
    const pivot   = items[Math.floor((right + left) / 2)];
    let i = left;
    let j = right;
    const loop = async () => {
      while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            await this.swap(items, i, j);
            i++;
            j--;
        }
      }
    };
    return loop().then(res => i);
  }



  async selectionSort(items: number[], n: number): Promise<void> {
    let minIndex = 0;
    for (let i = 0; i < n - 1; i++){
      minIndex = i;
      for (let j = i + 1; j < n; j++){
        if (items[j] < items[minIndex]){
          minIndex = j;
        }
      }
      await this.swap(items, minIndex, i);
    }
  }

  async insertionSort(items: number[]): Promise<void> {
    let x = 0;
    let j = 0;
    for (let i = 1; i < items.length; i++){
      x = items[i];
      j = i - 1;
      while (items[j] > x && j >= 0){
        await this.wait(this.animationSpeed).then((res) => {
          items[j + 1] = items[j];
          this.swaps += 1;
        });
        j--;
      }
      items[j + 1] = x;
    }
  }

  async shellSort(arr: number[], n: number): Promise<void>{
    for (let gap = n / 2; gap > 0; gap /= 2){
      gap = Math.floor(gap);
      for (let i = gap; i < n; i += 1){
        const temp = arr[i];
        let j: number;
        for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
          await this.wait(this.animationSpeed).then(() => {
            arr[j] = arr[j - gap];
            this.swaps += 1;
          });
        }
        arr[j] = temp;
      }
    }
  }

  async heapSort(arr: number[], n: number): Promise<void>{
    for (let i = n / 2 - 1; i >= 0; i--) {
      await this.heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      await this.swap(arr, 0, i);
      await this.heapify(arr, i, 0);
    }
  }

  async heapify(arr: number[], n: number, i: number): Promise<void>{
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest]) {
      largest = l;
    }

    if (r < n && arr[r] > arr[largest]) {
      largest = r;
    }

    if (largest !== i) {
      await this.swap(arr, i, largest);

      await this.heapify(arr, n, largest);
    }
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
    return await this.merge(left, right);
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

  pickCategory(category: string): void{
    this.category = category;
  }

  chosenCategory(category: string): boolean{
    return this.category === category;
  }

}
