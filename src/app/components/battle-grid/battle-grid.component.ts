import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'bf-battle-grid',
  templateUrl: './battle-grid.component.html',
  styleUrls: ['./battle-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleGridComponent implements OnInit {
  battleGrids = this.generateGrid(10);

  generateArray(num: number) {
    const array = new Array(num);
    array.fill(0);
    return array;
  }

  generateGrid(num: number) {
    const array = this.generateArray(num);
    return array.map(()=> this.generateArray(num));
  }

  constructor() { }

  ngOnInit(): void {
  }

}
