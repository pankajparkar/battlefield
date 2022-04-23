import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'bf-cargo-port',
  templateUrl: './cargo-port.component.html',
  styleUrls: ['./cargo-port.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CargoPortComponent implements OnInit {

  verticalShips = [
    {id: 1, size: 4 },
    {id: 2, size: 3 },
    {id: 3, size: 2 },
    {id: 4, size: 1 },
  ];

  horizontalShips = [
    {id: 5, size: 4 },
    {id: 6, size: 3 },
    {id: 7, size: 2 },
    {id: 8, size: 1 },
  ];

  constructor() { }

  getArray(size: number) {
    const array = new Array(size);
    return array;
  }

  ngOnInit(): void {
  }

}
