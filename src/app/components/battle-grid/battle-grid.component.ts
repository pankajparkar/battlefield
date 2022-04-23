import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bf-battle-grid',
  templateUrl: './battle-grid.component.html',
  styleUrls: ['./battle-grid.component.scss']
})
export class BattleGridComponent implements OnInit {
  battleGrids = [
    this.getArray(),
    this.getArray(),
  ];

  getArray() {
    const array = new Array(10);
    array.fill(0);
    return array;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
