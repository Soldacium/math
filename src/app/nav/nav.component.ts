import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeCategories: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addActiveCategory(category: string): void {
    if (this.activeCategories.includes(category)){
      this.activeCategories.splice(this.activeCategories.indexOf(category), 1);
    } else {
      this.activeCategories.push(category);
    }
  }

  checkIfActive(category: string): boolean {
    return this.activeCategories.includes(category);
  }

}
