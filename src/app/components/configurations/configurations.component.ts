import { Component, Input, OnInit } from '@angular/core';
import { Configuration } from 'src/app/models';
import { FleetPositionsService } from 'src/app/services';

@Component({
  selector: 'bf-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {

  sound = false;

  @Input() configuration!: Configuration;

  constructor(
    private fleetPositions: FleetPositionsService,
  ) { }

  updateConfiguration() {
    this.fleetPositions.updateConfiguration(this.configuration);
  }

  reset() {
    this.fleetPositions.resetPositions(this.configuration.playerId);
  }
  random() {
    this.fleetPositions.randomPositions();
  }

  ngOnInit(): void {
  }

}
