import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FleetPositionsService } from 'src/app/services';

@Component({
  selector: 'bf-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {

  constructor(
    private fleetPositions: FleetPositionsService,
  ) { }

  reset() {
    this.fleetPositions.updatePlayers([]);
  }
  random() {
    this.fleetPositions.randomPositions();
  }

  ngOnInit(): void {
  }

}
