import { FleetPosition } from "./fleet-position.model";

export interface Player {
    id: string;
    player: string;
    positions: FleetPosition;
}
