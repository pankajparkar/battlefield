import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttackState } from 'src/app/enums';

import { FleetPosition } from '../../models';

const defaultPostion = {
  vertical: [],
  horizontal: [],
};

@Component({
  selector: 'bs-battle-grid',
  templateUrl: './battle-grid.component.html',
  styleUrls: ['./battle-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleGridComponent implements OnInit {

  @Input() attack!: { [key: string]: AttackState };
  @Input() dropEnabled = false;
  @Output() onShot = new EventEmitter<number[]>();

  battleGrids = this.generateGrid(10);

  private _positions: FleetPosition = JSON.parse(
    JSON.stringify(defaultPostion)
  );

  @Input() get positions() {
    return this._positions;
  }

  constructor() { }

  set positions(pos: FleetPosition | null) {
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

  generateGrid(num: number) {
    return this.generateEmptyArray(num)
      .map(() => this.generateEmptyArray(num));
  }

  dragStarted(a: any) {
    console.log('currentIndex', a.currentIndex, a);
  }

  canDrop() {
    return !this.dropEnabled;
  }

  ngOnInit(): void {
  }

}
