import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { AttackState, Sound } from 'src/app/enums';
import { FleetPosition, Player } from 'src/app/models';
import { AudioService, FleetPositionsService } from 'src/app/services';

@Component({
  selector: 'bs-battle-platform',
  templateUrl: './battle-platform.component.html',
  styleUrls: ['./battle-platform.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BattlePlatformComponent {

  players$: Observable<Player[]> = this.fleetPosition.playersObservable;
  winner$ = this.fleetPosition.checkWinner$;
  currentPlayer$ = this.fleetPosition.currentPlayer$;
  playerToReset$ = this.fleetPosition.playerToReset$;
  positions$ = combineLatest([
    this.players$,
    this.currentPlayer$,
  ]).pipe(
    map(
      ([players, currentPlayer]) => players.length > 0 ?
        currentPlayer.positions :
        null
    ),
  );

  constructor(
    private fleetPosition: FleetPositionsService,
    private audio: AudioService,
  ) { }

  isCurrentPlayer(player: Player, currentPlayer: Player) {
    return player.id !== currentPlayer.id
  }

  getConfiguration(id: string) {
    return this.fleetPosition.getConfiguration(id);
  }

  shot(el: number[], positions: FleetPosition) {
    const attackStatus = this.fleetPosition.shot(positions, el);
    // TODO: improve below logic
    if (attackStatus === AttackState.Wounded) {
      this.audio.play(Sound.Wounded);
    }
    if (AttackState.Missed === attackStatus) {
      this.audio.play(Sound.Missed);
    }
    if (AttackState.Killed === attackStatus) {
      this.audio.play(Sound.Killed);
    }
  }

}
