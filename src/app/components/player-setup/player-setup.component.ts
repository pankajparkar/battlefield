import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { EventDragData, Player } from 'src/app/models';
import { FleetPositionsService } from 'src/app/services';
import { canDragAtPosition, generatePosition, isPlayerCompletelySetup } from 'src/app/utils';

@Component({
  selector: 'bs-player-setup',
  templateUrl: './player-setup.component.html',
  styleUrls: ['./player-setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerSetupComponent {

  @Input() player!: Player;
  highlight: number[][] | null = null;
  disabled = true;

  constructor(
    private cd: ChangeDetectorRef,
    private fleetPosition: FleetPositionsService,
  ) { }

  dragEntered(element: EventDragData) {
    const dragData = element.$event.item.data;
    const newPosition = generatePosition(element.currentPosition!, dragData.shipBlocks);
    if (canDragAtPosition(this.player.positions, newPosition)) {
      this.highlight = newPosition;
    }
  }

  dragExited(_: EventDragData) {
    // this.highlight = null;
  }

  dragDropped(element: EventDragData) {
    if (!this.highlight) {
      return;
    }
    const dragData = element.$event.item.data;
    const existingPosition = this.player.positions;
    if (dragData.isHorizontal) {
      existingPosition?.horizontal.push(this.highlight);
    } else {
      existingPosition?.vertical.push(this.highlight);
    }
    this.player.positions = { ...existingPosition };
    this.highlight = null;
    this.disabled = !isPlayerCompletelySetup(this.player.positions);
    this.cd.detectChanges();
    console.log('highlightt', this.highlight)
  }

  save() {
    this.fleetPosition.updatePlayer(this.player);
  }

}
