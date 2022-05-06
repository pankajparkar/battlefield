import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttackState } from 'src/app/enums';
import { generatePosition } from 'src/app/utils';

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

  constructor(
    private cd: ChangeDetectorRef,
  ) { }

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

  dragDropped(element: any, currentPoint: number[]) {
    const dragData = element.item.data;
    const existingPosition = this.positions;
    const newPosition = generatePosition(currentPoint, dragData.shipBlocks)
    if (dragData.isHorizontal) {
      existingPosition?.horizontal.push(newPosition);
    } else {
      existingPosition?.vertical.push(newPosition);
    }
    this.positions = existingPosition;
    this.cd.detach();
    this.cd.detectChanges();
  }

  canDrop() {
    return !this.dropEnabled;
  }

  ngOnInit(): void {
  }

}
