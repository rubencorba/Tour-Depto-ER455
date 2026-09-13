import type { RoomId } from './room';

export interface FloorPlanRoom {
  id: RoomId;
  x: number; // % del ancho del plano (0–100)
  y: number; // % del alto del plano (0–100)
}