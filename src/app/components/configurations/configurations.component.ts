import { Component, OnInit } from '@angular/core';
import { FleetPositionsService } from 'src/app/services';

@Component({
  selector: 'bf-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {

  sound = false;

  constructor(
    private fleetPositions: FleetPositionsService,
  ) { }

  reset() {
    this.fleetPositions.updatePlayers([]);
  }
  random() {
    this.fleetPositions.randomPositions();
  }

  ngOnInit(): void {
  }

}
