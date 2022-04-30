import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { Player } from './models';
import { FleetPositionsService } from './services/fleet-positions.service';

@Component({
  selector: 'bf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

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

}
