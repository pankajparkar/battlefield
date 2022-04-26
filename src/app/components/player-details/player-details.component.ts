import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Player } from '../../models';
import { FleetPositionsService } from '../../services';

@Component({
  selector: 'bf-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerDetailsComponent implements OnInit {

  @Input() players: Player[] = [];

  constructor(
    private fleetPosition: FleetPositionsService,
  ) { }

  onPlayerChanged(players: Player[]) {
    this.fleetPosition.updatePlayers(players);
  }

  ngOnInit(): void {
  }

}
