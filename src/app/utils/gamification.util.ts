import { AttackState } from "../enums";
import { FleetPosition, Player } from "../models";

import { environment } from "src/environments/environment";

export function findSurroundingPoints([a, b]: number[]) {
    return [
        // [x+1,y], [x-1,y] point
        [a + 1, b], [a + 1, b],
        // [x,y + 1], [x, y - 1] point
        [a + 1, b], [a + 1, b],
        // [x + 1,y + 1], [x - 1, y - 1] point
        [a + 1, b + 1], [a - 1, b - 1]
    ];
}

// TODO: cleanup existing points 
// This can be used for enhancements
function isSurroundingWater(pos: number[][], searchPoint: number[]): boolean {
    const allSurroundingPositions = pos.reduce((acc, [a, b]: number[]) => [
        ...acc,
        ...findSurroundingPoints([a, b]),
    ], <number[][]>[])
    return allSurroundingPositions.some(pos => pos.toString() === searchPoint.toString());
}

function isHit(pos: number[][], searchPoint: number[]) {
    return pos.some(pos => pos.toString() === searchPoint.toString());
}

export function attack(positions: FleetPosition, attackPoint: number[]) {
    const pos = [
        ...(positions.horizontal).flat(1),
        ...(positions.vertical).flat(1)
    ];
    if (isHit(pos, attackPoint)) {
        return AttackState.Ship;
    } else if (isSurroundingWater(pos, attackPoint)) {
        return AttackState.SurroundingWater;
    }
    else {
        return AttackState.Water;
    }
}

export function findWinner(players: Player[]): boolean {
    const winnerPlayer = players.some(player => {
        const filteredAttack = Array.from(player.attack.values())
            .filter((v: AttackState) => AttackState.Ship === v);
        return filteredAttack.length === environment.winner;
    });
    return winnerPlayer;
}
