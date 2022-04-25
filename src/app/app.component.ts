import { Component } from '@angular/core';
import { FleetPosition, Player } from './models';
import { FleetPositionsService } from './services/fleet-positions.service';

@Component({
  selector: 'bf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  players: Player[] = this.fleetPosition.getPlayers() ?? [];
  positions: FleetPosition = this.players[0]?.positions ?? [];

  constructor(
    private fleetPosition: FleetPositionsService,
  ) { }

  get showPort() {
    return [
      ...this.positions?.horizontal ?? [],
      ...this.positions?.vertical ?? [],
    ].length !== 8
  }
}
