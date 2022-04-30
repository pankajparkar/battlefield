import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { AttackState } from '../enums';

import { FleetPosition, Player } from '../models';
import { attack, findWinner } from '../utils';
import { ApiService } from './api.service';

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

  private players$ = new BehaviorSubject<Player[]>(
    this.apiService.getPlayers() ?? []
  );
  playersObservable = this.players$.asObservable().pipe(
    tap((players) => this.apiService.updatePlayers(players))
  );
  checkWinner$: Observable<Player | undefined> = this.playersObservable.pipe(
    map(players => findWinner(players)),
  );

  constructor(
    private apiService: ApiService
  ) {
  }

  uuid() {
    let result, i, j;
    result = '';
    for (let j = 0; j < 32; j++) {
      if (j == 8 || j == 12 || j == 16 || j == 20)
        result = result + '-';
      i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
      result = result + i;
    }
    return result;
  }

  attack(positions: FleetPosition, el: number[]) {
    const attackStatus = attack(positions, el);
    const player = this.players$.getValue()[0];
    player.attack?.set(el.toString(), attackStatus)
  }

  getPlayer() {
    return {
      id: this.uuid(),
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
