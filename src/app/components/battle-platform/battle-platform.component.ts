import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest, lastValueFrom, map, Observable, of, switchMap, withLatestFrom } from 'rxjs';
import { Sound } from 'src/app/enums';
import { Player } from 'src/app/models';
import { AudioService, FleetPositionsService } from 'src/app/services';
import { PlayerDetailsComponent } from '../player-details/player-details.component';

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
  showPort$ = this.players$.pipe(
    switchMap(async (players) => {
      const playersFiltered = players.filter(({ positions: { horizontal, vertical } }) => {
        return [
          ...(horizontal ?? []),
          ...(vertical ?? []),
        ].length === 8;
      });
      if (playersFiltered.length === 2) {
        return false;
      }
      if (playersFiltered.length === 1) {
        return true;
      }
      if (!playersFiltered.length) {
        const dialogRef = this.dialog.open(PlayerDetailsComponent, {
          disableClose: true,
        });
        const { componentInstance } = dialogRef
        componentInstance.players = players;
        await lastValueFrom(dialogRef.afterClosed());
        this.audio.play(Sound.GameStarted);
        this.snackbar.open('Game Started Successfully.');
      }
      return false;
    })
  )

  constructor(
    private fleetPosition: FleetPositionsService,
    private audio: AudioService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) { }

  isCurrentPlayer(player: Player, currentPlayer: Player) {
    return player.id !== currentPlayer.id
  }

  getConfiguration(id: string) {
    return this.fleetPosition.getConfiguration(id);
  }

}
