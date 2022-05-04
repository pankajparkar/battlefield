import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

const vertical = [
  [[0, 1], [0, 2], [0, 3], [0, 4]],
  [[1, 1], [1, 2], [1, 3]],
  [[2, 1], [3, 2]],
  [[3, 0]],
];
const horizontal = [
  [[5, 1], [6, 1], [7, 1], [8, 1]],
  [[6, 1], [6, 2], [6, 3]],
  [[7, 1], [7, 2]],
  [[8, 1]],
];

@Component({
  selector: 'bf-cargo-port',
  templateUrl: './cargo-port.component.html',
  styleUrls: ['./cargo-port.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CargoPortComponent {

  verticalShips = vertical;
  horizontalShips = horizontal;

  constructor() { }

}
