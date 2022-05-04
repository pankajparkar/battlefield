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

  @HostBinding('class.is-ship-block')
  @Input() get isShipBlock() {
    return (this._shipBlocks ?? []).some(ship => ship.toString() === this.currentShipBlock?.toString());
  };
  @HostBinding('class.is-play-mode')
  @Input() isPlayMode = false;
  @Input() attackStatus: AttackState | undefined;
  @Input() currentShipBlock: number[] = [];

  @Input()
  get shipBlocks() {
    return this._shipBlocks;
  }
  set shipBlocks(blocks: number[][]) {
    this._shipBlocks = blocks;
    this.firstShipBlock = this.compareBlocks(0);
    this.lastShipBlock = this.compareBlocks(blocks.length - 1);
  };

  @Output() onAttack = new EventEmitter<number[]>();

  @HostBinding('class.attacked')
  get isAttacked() {
    return this.attackStatus === AttackState.Ship;
  }

  @HostBinding('class.attack-missed')
  get isAttackMissed() {
    return [AttackState.Water, AttackState.SurroundingWater].includes(this.attackStatus!);
  }

  constructor() { }

  compareBlocks(index: number) {
    return this._shipBlocks?.length > 0 && this._shipBlocks[index]?.toString() === this.currentShipBlock?.toString();
  }

}
