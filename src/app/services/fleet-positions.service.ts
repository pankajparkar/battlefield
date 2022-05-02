import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, delay, map, Subject, switchMap, tap, timer } from 'rxjs';
import { AttackState } from '../enums';

import { FleetPosition, Player } from '../models';
import { attack, findWinner } from '../utils';
import { ApiService } from './api.service';
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

  // TODO: segregate things from here,
  // some streams are unrelated here
  private players$ = new BehaviorSubject<Player[]>(
    this.apiService.getPlayers() ?? []
  );
  private action$ = new BehaviorSubject<number>(0);
  playersObservable = this.players$.asObservable().pipe(
    tap((players) => this.apiService.updatePlayers(players))
  );
  attackObservable = new Subject<void>();
  checkWinner$ = combineLatest([
    this.action$.asObservable(),
    this.playersObservable,
  ]).pipe(
    map(([, players]) => findWinner(players))
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
  ) { }

  attack(positions: FleetPosition, el: number[]) {
    const attackStatus = attack(positions, el);
    // TODO: Improve this logic of attack player 
    const player = this.players$.getValue()[this.action$.getValue() % 2];
    player.attack?.set(el.toString(), attackStatus);
    this.action$.next(this.action$.getValue() + 1);
  }

  getPlayer() {
    return {
      id: this.uuid.generate(),
      player: '',
      positions,
      attack: new Map<string, AttackState>(),
    }
  }

  updatePlayers(players: Player[]) {
    this.players$.next(players);
  }

  // TODO: random position logic is pending
  // Also handle the player name part in this case
  randomPositions() {
    const players = [
      this.getPlayer(),
      this.getPlayer(),
    ];
    this.players$.next(players);
  }
}
