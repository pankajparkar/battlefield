import { Component } from '@angular/core';
import { FleetPosition } from './models';
import { FleetPositionsService } from './services/fleet-positions.service';

@Component({
  selector: 'bf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  positions: FleetPosition = this.fleetPosition.getPositions();

  constructor(
    private fleetPosition: FleetPositionsService,
  ) { }

  get showPort() {
    return [
      ...this.positions.horizontal,
      ...this.positions.vertical,
    ].length !== 8
  }
}
