import { Component, OnInit } from '@angular/core';
import anime from 'animejs';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  optionsEl!: HTMLElement;
  optionsVisible = true;
  
  constructor() { }

  ngOnInit(): void {
    this.optionsEl = document.getElementById('options-component') as HTMLElement;
    this.changeOptionsMode();
  }

  changeOptionsMode(): void{
    this.optionsVisible ? this.closeOptions() : this.openOptions();
    this.optionsVisible = !this.optionsVisible;
  }

  openOptions(): void{
    var tl = anime.timeline({
      duration: 200,
      easing: 'linear'
    });
    tl.add({
      targets: this.optionsEl,
      'max-width': '350px'
    })
    .add({
      targets: this.optionsEl,
      delay: 60,
      'max-height': '350px'
    });
  }

  closeOptions(): void{
    var tl = anime.timeline({
      duration: 200,
      easing: 'linear'
    });
    tl.add({
      targets: this.optionsEl,
      'max-height': '48px'
    })
    .add({
      targets: this.optionsEl,
      'max-width': '48px'
    })
  }

}
