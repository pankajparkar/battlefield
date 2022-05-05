import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Player } from '../../models';
import { FleetPositionsService } from '../../services';

@Component({
  selector: 'bs-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerDetailsComponent implements OnInit {

  @Input() players: Player[] = [];

  constructor(
    private fleetPosition: FleetPositionsService,
    private dialogRef: MatDialogRef<PlayerDetailsComponent>,
  ) { }

  submit() {
    this.fleetPosition.updatePlayers(this.players);
    this.fleetPosition.resetConfiguration(this.players);
    this.dialogRef.close();
  }

  ngOnInit() {
    if (!this.players.length) {
      this.players = [
        this.fleetPosition.getPlayer(),
        this.fleetPosition.getPlayer(),
      ];
    }
  }
}
