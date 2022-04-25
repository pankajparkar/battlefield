import { Injectable } from '@angular/core';
import { FleetPosition, Player } from '../models';
import { ApiService } from './api.service';

const positions: FleetPosition = {
  horizontal: [
    [[1,1], [1,2], [1,3], [1,4]],
    [[3,1], [3,2], [3,3]],
    [[5,1], [5,2]],
    [[9,0]],
  ],
  vertical: [
    [[2,7], [3,7], [4,7], [5,7]],
    [[2,9], [3,9], [4,9]],
    [[7,7], [8,7]],
    [[9,9]],
  ],
};

const players: Player[] = [
  {
    id: '123',
    player: 'Pankaj',
    positions,
  },
  {
    id: '123',
    player: 'Pankaj',
    positions,
  }
];

@Injectable({
  providedIn: 'root'
})
export class FleetPositionsService {

  constructor(
    private apiService: ApiService
  ) { 
    // TODO: remove this after adding manipulation logic
    this.apiService.updatePlayers(players)
  }

  getPositions() {
    return positions;
  }
}
