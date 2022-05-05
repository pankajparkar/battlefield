import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

const vertical = [
  [[2, 7], [3, 7], [4, 7], [5, 7]],
  [[2, 9], [3, 9], [4, 9]],
  [[7, 7], [8, 7]],
  [[9, 9]],
];
const horizontal = [
  [[1, 1], [1, 2], [1, 3], [1, 4]],
  [[3, 1], [3, 2], [3, 3]],
  [[5, 1], [5, 2]],
  [[9, 0]],
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
