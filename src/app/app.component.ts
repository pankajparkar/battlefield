import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';

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
  positions$ = this.players$.pipe(
    map(
      players => players.length > 0 ?
        players[0].positions :
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
