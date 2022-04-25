import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'bf-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipComponent implements OnInit {

  @HostBinding('class.is-ship')
  @Input() isShip = false;

  @Output() onAttack = new EventEmitter<number[]>();

  constructor() { }

  ngOnInit(): void {
  }

}
