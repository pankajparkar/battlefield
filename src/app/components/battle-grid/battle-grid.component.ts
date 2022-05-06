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
  set positions(pos: FleetPosition | null) {
    this._positions = pos || JSON.parse(
      JSON.stringify(defaultPostion)
    );
    this.battleGrids = this.generateGrid(10);
  }

  constructor() { }

  generateEmptyArray(num: number): number[] {
    return new Array(num).fill(0);
  }

  generateGrid(num: number) {
    return this.generateEmptyArray(num)
      .map(() => this.generateEmptyArray(num));
  }

  dragStarted(a: any) {
    console.log('dragStarted', a.currentIndex, a);
  }

  dragExited(a: any) {
    console.log('dragExited', a.currentIndex, a);
  }

  dragDropped(a: any) {
    console.log('dragDropped', a.currentIndex, a);
  }

  canDrop() {
    return !this.dropEnabled;
  }

  ngOnInit(): void {
  }

}
