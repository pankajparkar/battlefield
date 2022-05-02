import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Player } from 'src/app/models';
import { FleetPositionsService } from 'src/app/services';

@Component({
  selector: 'bf-battle-platform',
  templateUrl: './battle-platform.component.html',
  styleUrls: ['./battle-platform.component.scss']
})
export class BattlePlatformComponent {

  players$: Observable<Player[]> = this.fleetPosition.playersObservable;
  winner$ = this.fleetPosition.checkWinner$;
  currentPlayer$ = this.fleetPosition.currentPlayer$;
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
  showPort$ = this.positions$.pipe(
    map(positions => ([
      ...(positions?.horizontal ?? []),
      ...(positions?.vertical ?? []),
    ].length !== 8))
  )

  constructor(
    private fleetPosition: FleetPositionsService,
  ) { }

  isCurrentPlayer(player: Player, currentPlayer: Player) {
    return player.id !== currentPlayer.id
  }

}