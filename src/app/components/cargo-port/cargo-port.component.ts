import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'bf-cargo-port',
  templateUrl: './cargo-port.component.html',
  styleUrls: ['./cargo-port.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CargoPortComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
