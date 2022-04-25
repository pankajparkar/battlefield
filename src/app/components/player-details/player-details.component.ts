import { Component, OnInit } from '@angular/core';
import { Player } from '../../models';
import { ApiService } from '../../services';

@Component({
  selector: 'bf-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent implements OnInit {

  players: Player[] = this.apiService.getPlayers();

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void { }

}
