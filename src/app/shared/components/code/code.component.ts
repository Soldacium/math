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
    this.text = this.content.nativeElement.childNodes[0].childNodes[0].textContent;
    let numberOfLines = this.text.split(/\r\n|\r|\n/).length;
    for(let i = 0; i < numberOfLines; i++){
      this.lines.push(i);
    }
    console.log();
  }

}
