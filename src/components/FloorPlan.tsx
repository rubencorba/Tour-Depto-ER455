import type { CSSProperties, JSX, KeyboardEvent } from 'react';
import { FLOOR_PLAN_ROOMS } from '../data/floorPlanConfig';
import { ROOMS_BY_ID } from '../data/roomsConfig';
import type { RoomId } from '../types/room';

interface FloorPlanProps {
    currentRoomId: RoomId | null;
    onSelectRoom: (roomId: RoomId) => void;
    className?: string;
    style?: CSSProperties;
}

// Wall segments as [x1, y1, x2, y2], in the same 0-100 viewBox units used
// by FLOOR_PLAN_ROOMS. Small gaps mark doorways. Approximated from the
// reference sketch - nudge freely to match it more closely.
const WALLS: [number, number, number, number][] = [
    // outer boundary
    [2, 2, 98, 2],
    [98, 2, 98, 98],
    [19, 98, 98, 98],
    [2, 98, 5, 98],
    [2, 2, 2, 98],
    // Living | right-side rooms
    [45, 2, 45, 38],
    [45, 53, 45, 98],
    // Dormitorio 2 | Baño
    /* [45, 38, 58, 38], */
    [55, 38, 98, 38],
    // Baño left wall
    [55, 38, 55, 51],
    // Baño | Dormitorio 1
    /* [45, 62, 55, 62], */
    [55, 62, 98, 62],
    // Cocina
    [22, 68, 45, 68],
    [22, 79, 22, 98],
];

const POINT_RADIUS = 4;

/**
 * Simplified interactive floor plan. Each point sits where a room's 360°
 * photo was taken and jumps straight to that scene on click/tap -
 * independent of the hotspot navigation graph, so any room is reachable
 * from any room via the plan.
 */
export default function FloorPlan({
    currentRoomId,
    onSelectRoom,
    className = '',
    style,
}: FloorPlanProps): JSX.Element {
    const handleKeyDown = (event: KeyboardEvent<SVGGElement>, roomId: RoomId) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onSelectRoom(roomId);
        }
    };

    return (
        <div className={`floor-plan-panel ${className}`} style={style}>
            <svg viewBox="0 0 100 100" className="h-full w-full" aria-label="Plano del departamento">
                <g stroke="white" strokeWidth={1.5} strokeLinecap="round">
                    {WALLS.map(([x1, y1, x2, y2], index) => (
                        <line key={`${x1}-${y1}-${x2}-${y2}-${index}`} x1={x1} y1={y1} x2={x2} y2={y2} />
                    ))}
                </g>

                {FLOOR_PLAN_ROOMS.map((room) => {
                    const isActive = room.id === currentRoomId;
                    const title = ROOMS_BY_ID[room.id]?.title ?? room.id;
                    const labelY = room.y - POINT_RADIUS - 2;

                    return (
                        <g
                            key={room.id}
                            role="button"
                            tabIndex={0}
                            aria-label={`Ir a ${title}`}
                            onClick={() => onSelectRoom(room.id)}
                            onKeyDown={(event) => handleKeyDown(event, room.id)}
                            className="cursor-pointer focus:outline-none"
                        >
                            <title>{title}</title>
                            <text x={room.x} y={labelY} textAnchor="middle" className="floor-plan-label">
                                {title}
                            </text>
                            <circle
                                cx={room.x}
                                cy={room.y}
                                r={isActive ? POINT_RADIUS + 1 : POINT_RADIUS}
                                className={isActive ? 'floor-plan-point floor-plan-point--active' : 'floor-plan-point'}
                            />
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}