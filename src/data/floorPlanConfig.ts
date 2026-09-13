// src/data/floorPlanConfig.ts
import type { FloorPlanRoom } from '../types/floorPlan';
import type { RoomId } from '../types/room';
import { ROOM_IDS } from './roomsConfig';

/**
 * Center-point coordinates (in % of the floor plan's width/height) for
 * each room - these are where the 360° photos were actually taken, so
 * they double as the clickable navigation points on the plan.
 *
 * Estimated from the reference sketch; nudge x/y once the SVG artwork
 * is rendered so each point sits visually centered in its room.
 */
export const FLOOR_PLAN_ROOMS: FloorPlanRoom[] = [
  { id: ROOM_IDS.living, x: 20, y: 42 },
  { id: ROOM_IDS.dormitorio2, x: 72, y: 19 },
  { id: ROOM_IDS.banio, x: 78, y: 50 },
  { id: ROOM_IDS.cocina, x: 33, y: 84 },
  { id: ROOM_IDS.dormitorio1, x: 72, y: 81 },
];

/** Convenience lookup, mirroring the ROOMS_BY_ID pattern in roomsConfig.ts. */
export const FLOOR_PLAN_ROOMS_BY_ID: Record<RoomId, FloorPlanRoom> = Object.fromEntries(
  FLOOR_PLAN_ROOMS.map((room) => [room.id, room]),
) as Record<RoomId, FloorPlanRoom>;