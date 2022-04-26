import { FleetPosition } from "../models";

export enum AttackState {
    Ship,
    SurroundingWater,
    Water,
}

function isSurroundingWater(pos: number[][], searchPoint: number[]): boolean {
    return pos.some(pos => pos.toString() === searchPoint.toString());
}

function isHit(pos: number[][], searchPoint: number[]) {
    return pos.some(pos => pos.toString() === searchPoint.toString());
}

export function attack(positions: FleetPosition, attackPoint: number[]): AttackState {
    const pos = [
        ...(positions.horizontal).flat(1),
        ...(positions.vertical).flat(1)
    ];
    if (isHit(pos, attackPoint)) {
        return AttackState.Ship;
    } else if (isSurroundingWater(pos, attackPoint)) {
        return AttackState.SurroundingWater;
    } else {
        return AttackState.Water;
    }
}