import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FleetPosition } from 'src/app/models';

@Component({
  selector: 'bf-battle-grid',
  templateUrl: './battle-grid.component.html',
  styleUrls: ['./battle-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleGridComponent implements OnInit {

  battleGrids = this.generateGrid(10);
  private _positions: FleetPosition = {
    vertical: [],
    horizontal: []
  };

  @Input() get positions() {
    return this._positions;
  }
  set positions(pos: FleetPosition) {
    this._positions = pos;
    this.battleGrids = this.generateGrid(10);
  }

  generateEmptyArray(num: number): number[] {
    const array = new Array(num);
    array.fill(0);
    return array;
  }

  generateArray(num: number, rowIndex: number) {
    const array = this.generateEmptyArray(num);
    const positions = [
      ...this.positions?.horizontal.flat(1) || [],
      ...this.positions?.vertical.flat(1) || []
    ];
    return array.map((_, index) => 
      positions.some(position => {
        return position.toString() === [rowIndex, index].toString();
      })
    );
  }

  generateGrid(num: number) {
    const array = this.generateEmptyArray(num);
    return array.map((_, index)=> this.generateArray(num, index));
  }

  constructor() { }

  ngOnInit(): void {
  }

}
