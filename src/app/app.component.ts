import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { Player } from './models';
import { FleetPositionsService } from './services/fleet-positions.service';

@Component({
  selector: 'bf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

}
