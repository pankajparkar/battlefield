import { Injectable } from '@angular/core';
import { Entity } from '../enums';
import { FleetPosition, Player } from '../models';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private storage: StorageService,
  ) { }

  getPlayers() {
    return this.storage.get<Player[]>(Entity.PLAYERS);
  }

  updatePlayer(player: Player): void {
    const players = this.getPlayers();
    const playerIndex = players.findIndex((p: Player) => p.id === player.id);
    // Update player
    if (playerIndex > -1) {
      players[playerIndex] = player;
    } 
    // Add player
    else {
      players[players.length] = player;
    }
    this.storage.set(Entity.PLAYERS, players);
  }

  updatePlayers(players: Player[]) {
    this.storage.set(Entity.PLAYERS, players);
  }

  clearPlayer() {
    this.storage.set(Entity.PLAYERS, "[]");
  }

  getPositions(playerId: string) {
    const players = this.getPlayers();
    const player = players.find(p => p.id === playerId)
    return player?.positions || [];
  }

  updatePositions(playerId: string, positions: FleetPosition) {
    const players = this.getPlayers();
    const player = players.find(p => p.id === playerId);
    if (player) {
      player.positions = positions;
      this.storage.set(Entity.PLAYERS, players);
    }
  }

  clearPositions(playerId: string) {
    const players = this.getPlayers();
    const player = players.find(p => p.id === playerId);
    if (player) {
      player.positions = {
        horizontal: [],
        vertical: [],
      };
      this.storage.set(Entity.PLAYERS, players);
    }
  }

}
