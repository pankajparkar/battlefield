import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AttackState, Sound } from 'src/app/enums';

import { FleetPosition } from '../../models';
import { FleetPositionsService, AudioService } from '../../services';

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
    return array;
  }

  generateGrid(num: number) {
    const array = this.generateEmptyArray(num);
    return array.map((_, index) => this.generateArray(num, index));
  }

  hit(el: number[]) {
    const attackStatus = this.fleetService.attack(this._positions, el);
    // TODO: improve below logic
    if (attackStatus === AttackState.Wounded) {
      this.audio.play(Sound.Wounded);
    }
    if (AttackState.Missed === attackStatus) {
      this.audio.play(Sound.Missed);
    }
    if (AttackState.Killed === attackStatus) {
      this.audio.play(Sound.Killed);
    }
  }

  ngOnInit(): void {
  }

}
