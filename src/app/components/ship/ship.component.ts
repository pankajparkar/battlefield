import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { AttackState } from 'src/app/enums';

@Component({
  selector: 'bf-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipComponent implements OnInit {

  @HostBinding('class.is-ship')
  @Input() isShip = false;
  @Input() attackStatus: AttackState | undefined;

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

  ngOnInit(): void {
  }

}
