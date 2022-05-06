import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { AttackState } from 'src/app/enums';

@Component({
  selector: 'bs-ship',
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
  @Input() highlight: number[][] | null = null;

  @Input()
  get shipBlocks() {
    return this._shipBlocks;
  }
  set shipBlocks(blocks: number[][]) {
    this._shipBlocks = blocks || [];
    if (this._shipBlocks.length > 1) {
      this.firstShipBlock = this.compareBlocks(0);
      this.lastShipBlock = this.compareBlocks(blocks.length - 1);
      this.isHorizontal = blocks[0][0] < blocks[1][0];
    }
  };

  @HostBinding('class.is-play-mode')
  @Input() isPlayMode = false;

  @HostBinding('class.highlight')
  get isHighlight() {
    return this.highlight?.find(h => h.toString() === this.currentShipBlock.toString());
  }

  @HostBinding('class.is-ship-block')
  get isShipBlock() {
    return (this._shipBlocks ?? []).some(ship => ship.toString() === this.currentShipBlock?.toString());
  };

  @HostListener('click')
  onClick() {
    if (this.isPlayMode) {
      this.onShot.emit(this.currentShipBlock);
    }
  }

  @HostBinding('class.attacked')
  get isAttacked() {
    return [AttackState.Wounded, AttackState.Killed].includes(this.attackStatus!);
  }

  @HostBinding('class.attack-missed')
  get isAttackMissed() {
    return AttackState.Missed === this.attackStatus;
  }
  @Output() onShot = new EventEmitter<number[]>();

  constructor() { }

  compareBlocks(index: number) {
    return this._shipBlocks?.length > 0 && this._shipBlocks[index]?.toString() === this.currentShipBlock?.toString();
  }

}
