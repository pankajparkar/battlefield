import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, combineLatest, delay, filter, lastValueFrom, map, Subject, switchMap, tap, timer } from 'rxjs';
import { PlayerDetailsComponent } from '../components/player-details/player-details.component';
import { AttackState, Sound } from '../enums';

import { Configuration, FleetPosition, Player } from '../models';
import { attack, findWinner } from '../utils';
import { ApiService } from './api.service';
import { AudioService } from './audio.service';
import { UuidService } from './uuid.service';

const positions: FleetPosition = {
  horizontal: [
    [[1, 1], [1, 2], [1, 3], [1, 4]],
    [[3, 1], [3, 2], [3, 3]],
    [[5, 1], [5, 2]],
    [[9, 0]],
  ],
  vertical: [
    [[2, 7], [3, 7], [4, 7], [5, 7]],
    [[2, 9], [3, 9], [4, 9]],
    [[7, 7], [8, 7]],
    [[9, 9]],
  ],
};

@Injectable({
  providedIn: 'root'
})
export class FleetPositionsService {

  // TODO: change below name
  attackObservable = new Subject<void>();

  // TODO: segregate things from here,
  // some streams are unrelated here
  private players$ = new BehaviorSubject<Player[]>(
    this.apiService.getPlayers() ?? []
  );
  private action$ = new BehaviorSubject<number>(0);
  playersObservable = this.players$.asObservable().pipe(
    tap((players) => this.apiService.updatePlayers(players)),
    switchMap(async (players) => {
      const playersFiltered = players.filter(({ positions: { horizontal, vertical } }) => {
        return [
          ...(horizontal ?? []),
          ...(vertical ?? []),
        ].length === 8;
      });
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
      return players;
    })
  );
  checkWinner$ = combineLatest([
    this.action$.asObservable(),
    this.playersObservable,
  ]).pipe(
    filter(([, players]) => findWinner(players)),
    tap(i => this.audio.play(Sound.Win))
  );

  playerToReset$ = this.playersObservable.pipe(
    map(
      (players) => players.find(player => [
        ...player.positions.horizontal,
        ...player.positions.vertical,
      ].length !== 8)
    )
  );

  currentPlayer$ = combineLatest([
    this.action$.asObservable(),
    this.playersObservable,
  ]).pipe(
    map(([actionCount, players]) => players[actionCount % 2])
  );

  constructor(
    private apiService: ApiService,
    private uuid: UuidService,
    private audio: AudioService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) { }

  attack(positions: FleetPosition, el: number[]): AttackState {
    const players = this.players$.getValue();
    const player = players[this.action$.getValue() % 2];
    const attackStatus = attack(positions, el, player.attack);
    // TODO: Improve this logic of attack player 
    player.attack[el.toString()] = attackStatus;
    this.action$.next(this.action$.getValue() + 1);
    this.updatePlayers(players);
    return attackStatus;
  }

  getPlayer() {
    return {
      id: this.uuid.generate(),
      player: '',
      positions,
      attack: {},
    }
  }

  getConfiguration(playerId: string) {
    const configuration = this.apiService.getConfiguration(playerId);
    return configuration!;
  }

  updateConfiguration(updatedConfiguration: Configuration): void {
    const configurations = this.apiService.getConfigurations();
    const configurationIndex = configurations.findIndex(
      config => config.playerId === updatedConfiguration.playerId
    );
    configurations[configurationIndex] = updatedConfiguration;
    this.apiService.updateConfigurations(configurations);
  }

  updatePlayers(players: Player[]) {
    this.players$.next(players);
  }

  resetConfiguration(players: Player[]) {
    let configurations = this.apiService.getConfigurations();
    if (!configurations.length) {
      configurations = players.map(player => ({
        playerId: player.id,
        sound: true,
      }));
      this.apiService.updateConfigurations(configurations);
    }
  }

  resetPositions(playerId: string) {
    const players = this.players$.getValue();
    const playerIndex = players.findIndex(p => p.id === playerId)!;
    const currentPlayer = players[playerIndex];
    players[playerIndex] = {
      ...this.getPlayer(),
      id: currentPlayer.id,
      player: currentPlayer.player,
      positions: {
        vertical: [],
        horizontal: [],
      }
    };
    this.updatePlayers(players);
  }

  // TODO: random position logic is pending
  // Also handle the player name part in this case
  randomPositions() {
    const players = [
      this.getPlayer(),
      this.getPlayer(),
    ];
    this.resetConfiguration(players);
    this.players$.next(players);
  }
}
