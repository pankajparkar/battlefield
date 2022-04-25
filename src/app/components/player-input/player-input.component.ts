import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models';

import { ApiService, FleetPositionsService } from '../../services';

@Component({
  selector: 'bf-player-input',
  templateUrl: './player-input.component.html',
  styleUrls: ['./player-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerInputComponent implements OnInit {

  players: Player[] = this.apiService.getPlayers() ?? [];

  constructor(
    private apiService: ApiService,
    private fleetPosition: FleetPositionsService,
  ) { }

  submit() {
    this.fleetPosition.updatePlayers(this.players);
  }

  ngOnInit(): void {
    if (!this.players.length) {
      this.players = [
        this.fleetPosition.getPlayer(),
        this.fleetPosition.getPlayer(),
      ];
    }
  }

}
