import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements AfterViewInit {
  @ViewChild('id')
  private content!: ElementRef;
  lines: number[] = [];
  text = '';

  constructor() { }

  ngAfterViewInit(): void {
    let numberOfLines = 0;
    let node: Node;

    for(node of (this.content.nativeElement.childNodes[0].childNodes )){
      this.text += node;
      numberOfLines += node.textContent ? node.textContent.split(/\r\n|\r|\n/).length : 0;
      numberOfLines -= node.nodeType === 1 ? 2 : 0;
    }

    for(let i = 0; i < numberOfLines; i++){
      this.lines.push(i);
    }
  }

}
