import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bf-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipComponent implements OnInit {

  @HostBinding('class.is-ship')
  @Input() isShip = false;

  constructor() { }

  ngOnInit(): void {
  }

}
