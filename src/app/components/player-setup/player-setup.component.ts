import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { EventDragData, Player } from 'src/app/models';
import { FleetPositionsService } from 'src/app/services';
import { generatePosition } from 'src/app/utils';

@Component({
  selector: 'bs-player-setup',
  templateUrl: './player-setup.component.html',
  styleUrls: ['./player-setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerSetupComponent {

  @Input() player!: Player;
  highlight: number[][] | null = null;

  constructor(
    private cd: ChangeDetectorRef,
    private fleetPosition: FleetPositionsService,
  ) { }

  dragEntered(element: EventDragData) {
    const dragData = element.$event.item.data;
    const newPosition = generatePosition(element.currentPosition!, dragData.shipBlocks)
    this.highlight = newPosition;
  }

  dragExited(_: EventDragData) {
    this.highlight = null;
  }

  dragDropped(element: EventDragData) {
    const dragData = element.$event.item.data;
    const existingPosition = this.player.positions;
    const newPosition = generatePosition(element.currentPosition!, dragData.shipBlocks)
    if (dragData.isHorizontal) {
      existingPosition?.horizontal.push(newPosition);
    } else {
      existingPosition?.vertical.push(newPosition);
    }
    this.player.positions = { ...existingPosition };
    this.highlight = null;
    // this.cd.detach();
    this.cd.detectChanges();
    console.log('highlightt', this.highlight)
  }

  save() {
    this.fleetPosition.updatePlayer(this.player);
  }

}
