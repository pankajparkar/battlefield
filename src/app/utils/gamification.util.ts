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

// TODO: find other attacks
function findAttackState(pos: number[][], attackPoint: number[]) {
    if (isHit(pos, attackPoint)) {
        return AttackState.Wounded;
    } else if (true) {
        return AttackState.Missed;
    }
}

function findMatchedShipFleet(positions: FleetPosition, attackPoint: number[], attack: { [key: string]: AttackState }) {
    const pos = [
        ...positions.horizontal,
        ...positions.vertical,
    ];
    return pos.find(p => p.some(i => i.toString() === attackPoint.toString()))
}

function isKilled(matchedFleet: number[][], attackPoint: number[], attack: { [key: string]: AttackState }) {
    return matchedFleet
        .filter(s => s.toString() !== attackPoint.toString())
        .every(s => attack[s.toString()] === AttackState.Wounded)
}

// TODO: make things more functional in attack
export function attack(positions: FleetPosition, attackPoint: number[], attack: { [key: string]: AttackState }) {
    const matchedFleet = findMatchedShipFleet(positions, attackPoint, attack);
    if (matchedFleet && isKilled(matchedFleet ?? [], attackPoint, attack)) {
        return AttackState.Killed;
    }
    const pos = [
        ...(positions.horizontal).flat(1),
        ...(positions.vertical).flat(1),
    ];
    return findAttackState(pos, attackPoint);
}

export function findWinner(players: Player[]): boolean {
    const winnerPlayer = players.some(player => {
        const filteredAttack = Object.values(player.attack)
            .filter((v: AttackState) => AttackState.Wounded === v);
        return filteredAttack.length === environment.winner;
    });
    return winnerPlayer;
}
