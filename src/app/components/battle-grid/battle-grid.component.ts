import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttackState } from 'src/app/enums';

import { EventDragData, FleetPosition } from '../../models';

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
  @Input() highlight: number[][] | null = null;
  @Output() onShot = new EventEmitter<number[]>();
  @Output() onDragEntered = new EventEmitter<EventDragData>();
  @Output() onDragExited = new EventEmitter<EventDragData>();
  @Output() onDragDropped = new EventEmitter<EventDragData>();

  battleGrids = this.generateGrid(10);
  map = new Map<string, number[][]>();

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
    // TODO: grid size hardcoded
    this.battleGrids = this.generateGrid(10);
    const positions = [
      ...pos!.horizontal,
      ...pos!.vertical,
    ];
    positions.forEach((position) => {
      position.forEach((p) => {
        this.map.set(p.toString(), position);
      });
    });
  }

  constructor() { }

  generateEmptyArray(num: number): number[] {
    return new Array(num).fill(0);
  }

  generateGrid(num: number) {
    return this.generateEmptyArray(num)
      .map(() => this.generateEmptyArray(num));
  }

  canDrop() {
    return !this.dropEnabled;
  }

  ngOnInit(): void {
  }

}
