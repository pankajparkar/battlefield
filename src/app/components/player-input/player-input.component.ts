import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from 'src/app/models';

import { FleetPositionsService } from '../../services';

@Component({
  selector: 'bf-player-input',
  templateUrl: './player-input.component.html',
  styleUrls: ['./player-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerInputComponent {

  @Input() players: Player[] = [];
  @Output() playersChanged = new EventEmitter<Player[]>();

  constructor(
    private fleetPosition: FleetPositionsService,
    private cd: ChangeDetectorRef,
  ) { }

  submit() {
    this.playersChanged.emit(this.players);
    this.fleetPosition.resetConfiguration(this.players);
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
