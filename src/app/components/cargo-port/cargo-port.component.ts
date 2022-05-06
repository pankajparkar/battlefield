import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

const vertical = [
  [[0, 0], [0, 1], [0, 2], [0, 3]],
  [[0, 0], [0, 1], [3, 2]],
  [[0, 0], [0, 1]],
  [[0, 0]],
];
const horizontal = [
  [[0, 0], [1, 0], [2, 0], [3, 0]],
  [[0, 0], [1, 0], [2, 0]],
  [[0, 0], [1, 0]],
  [[0, 0]],
];

@Component({
  selector: 'bs-cargo-port',
  templateUrl: './cargo-port.component.html',
  styleUrls: ['./cargo-port.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CargoPortComponent {

  verticalShips = vertical;
  horizontalShips = horizontal;

  constructor() { }

  dragStarted(a: any, e: any, b: any) {
    console.log('a', a);
    console.log('currentIndex', a.currentIndex);
    console.log('currentIndex', a.currentIndex, e, b);
  }

}
