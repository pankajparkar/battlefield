import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Player } from 'src/app/models';

@Component({
  selector: 'bs-player-setup',
  templateUrl: './player-setup.component.html',
  styleUrls: ['./player-setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerSetupComponent {

  @Input() player!: Player;

  constructor() { }

}
