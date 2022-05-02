import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { AttackState, Sound } from 'src/app/enums';

import { FleetPosition } from '../../models';
import { FleetPositionsService, AudioService } from '../../services';
import { attack } from '../../utils';

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

  @Input() attack!: Map<string, AttackState>;

  battleGrids = this.generateGrid(10);

  private _positions: FleetPosition = JSON.parse(
    JSON.stringify(defaultPostion)
  );

  @Input() get positions() {
    return this._positions;
  }

  constructor(
    private fleetService: FleetPositionsService,
    private audio: AudioService,
  ) { }

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
    return array.map((_, index) => this.generateArray(num, index));
  }

  hit(el: number[]) {
    const attackStatus = this.fleetService.attack(this._positions, el);
    if (attackStatus === AttackState.Ship) {
      this.audio.play(Sound.Wounded);
    }
    if ([AttackState.SurroundingWater, AttackState.Water].includes(attackStatus)) {
      this.audio.play(Sound.Missed);
    }
  }

  ngOnInit(): void {
  }

}
