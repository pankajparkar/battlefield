import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { AttackState } from 'src/app/enums';

@Component({
  selector: 'bf-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipComponent {

  private _shipBlocks: number[][] = [];
  firstShipBlock = false;
  lastShipBlock = false;
  isHorizontal = false;

  @Input() attackStatus: AttackState | undefined;
  @Input() currentShipBlock: number[] = [];

  @Input()
  get shipBlocks() {
    return this._shipBlocks;
  }
  set shipBlocks(blocks: number[][]) {
    this._shipBlocks = blocks;
    if (blocks.length > 1) {
      this.firstShipBlock = this.compareBlocks(0);
      this.lastShipBlock = this.compareBlocks(blocks.length - 1);
      this.isHorizontal = blocks[0][0] < blocks[1][0];
    }
  };

  @HostBinding('class.is-play-mode')
  @Input() isPlayMode = false;

  @HostBinding('class.is-ship-block')
  get isShipBlock() {
    return (this._shipBlocks ?? []).some(ship => ship.toString() === this.currentShipBlock?.toString());
  };

  @HostBinding('class.attacked')
  get isAttacked() {
    return [AttackState.Wounded, AttackState.Killed].includes(this.attackStatus!);
  }

  @HostBinding('class.attack-missed')
  get isAttackMissed() {
    return AttackState.Missed === this.attackStatus;
  }

  constructor() { }

  compareBlocks(index: number) {
    return this._shipBlocks?.length > 0 && this._shipBlocks[index]?.toString() === this.currentShipBlock?.toString();
  }

}
