import { CdkDragDrop, CdkDragEnter, CdkDragExit } from "@angular/cdk/drag-drop";

export interface DragData {
    shipBlocks: number[][];
    isHorizontal: boolean;
    currentPosition?: number[];
}

export interface EventDragData {
    $event: CdkDragEnter<DragData> | CdkDragDrop<DragData> | CdkDragExit<DragData>;
    currentPosition?: number[];
}
