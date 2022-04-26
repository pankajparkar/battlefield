import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FleetPosition } from 'src/app/models';

const defaultPostion = {
  vertical: [],
  horizontal: []
};

@Component({
  selector: 'bf-battle-grid',
  templateUrl: './battle-grid.component.html',
  styleUrls: ['./battle-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleGridComponent implements OnInit {

  battleGrids = this.generateGrid(10);

  private _positions: FleetPosition = JSON.parse(
    JSON.stringify(defaultPostion)
  );

  @Input() get positions() {
    return this._positions;
  }

  constructor() { }

  set positions(pos: FleetPosition|null) {
    this._positions = pos || JSON.parse(
      JSON.stringify(defaultPostion)
    );
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
      ...(this.positions?.horizontal ?? []).flat(1) || [],
      ...(this.positions?.vertical ?? []).flat(1) || []
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

  attack(el: number[]) {
    
  }

  ngOnInit(): void {
  }

}
