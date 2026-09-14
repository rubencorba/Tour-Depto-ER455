import banioImage from '../assets/panoramas/Banio.webp';
import cocinaImage from '../assets/panoramas/Cocina.webp';
import dormitorio1Image from '../assets/panoramas/Dormitorio1.webp';
import dormitorio2Image from '../assets/panoramas/Dormitorio2.webp';
import livingImage from '../assets/panoramas/Living.webp';
import dormitorio1AmuebladoImage from '../assets/panoramas/Dormitorio1Amueblado.webp';
import dormitorio2AmuebladoImage from '../assets/panoramas/Dormitorio2Amueblado.webp';
import livingAmuebladoImage from '../assets/panoramas/LivingAmueblado.webp';
import type { Room, RoomId } from '../types/room';

/**
 * Room ids. These double as:
 *  - the Pannellum scene id for each room
 *  - the target used by hotspots in ROOM_HOTSPOTS below
 * Keep them in sync with the panorama filenames in src/assets/panoramas.
 */
export const ROOM_IDS = {
  living: 'Living',
  banio: 'Banio',
  cocina: 'Cocina',
  dormitorio1: 'Dormitorio1',
  dormitorio2: 'Dormitorio2',
} as const satisfies Record<string, RoomId>;

/** Id of the first room shown once the user enters the tour. */
export const FIRST_ROOM_ID: RoomId = ROOM_IDS.living;

/** Shared field of view used for every room, per project requirements. */
const INITIAL_HFOV = 120;

/** Human readable titles, kept separate from ids/hotspots for clarity. */
const ROOM_TITLES: Record<RoomId, string> = {
  [ROOM_IDS.living]: 'Living',
  [ROOM_IDS.banio]: 'Baño',
  [ROOM_IDS.cocina]: 'Cocina',
  [ROOM_IDS.dormitorio1]: 'Dormitorio 1',
  [ROOM_IDS.dormitorio2]: 'Dormitorio 2',
};

/** Panorama image for each room. */
const ROOM_IMAGES: Record<RoomId, string> = {
  [ROOM_IDS.living]: livingImage,
  [ROOM_IDS.banio]: banioImage,
  [ROOM_IDS.cocina]: cocinaImage,
  [ROOM_IDS.dormitorio1]: dormitorio1Image,
  [ROOM_IDS.dormitorio2]: dormitorio2Image,
};

/** Initial camera framing for each room when its scene loads. */
const ROOM_INITIAL_VIEW: Record<RoomId, { yaw: number; pitch: number }> = {
  [ROOM_IDS.living]: { yaw: 0, pitch: 0 },
  [ROOM_IDS.banio]: { yaw: 0, pitch: 0 },
  [ROOM_IDS.cocina]: { yaw: 0, pitch: 0 },
  [ROOM_IDS.dormitorio1]: { yaw: 0, pitch: 0 },
  [ROOM_IDS.dormitorio2]: { yaw: 0, pitch: 0 },
};

/**
 * Hotspot placement, per room - this is THE place to adjust where each
 * navigation hotspot sits once the real panoramas are in place. `yaw` is
 * the horizontal angle (0-360°) and `pitch` the vertical angle (negative
 * looks down, positive looks up) where the hotspot appears.
 *
 * Tip for tuning: run the app, open the room in question, and use
 * Pannellum's own hotSpotDebug helper (or just eyeball it) - rotate the
 * view until the real doorway is centered, note the yaw/pitch shown, and
 * plug those values in here.
 */
const ROOM_HOTSPOTS: Record<RoomId, Room['hotspots']> = {
  [ROOM_IDS.living]: [
    { target: ROOM_IDS.banio, yaw: 100, pitch: 0, label: ROOM_TITLES[ROOM_IDS.banio] },
    { target: ROOM_IDS.dormitorio1, yaw: 100, pitch: -17, label: ROOM_TITLES[ROOM_IDS.dormitorio1] },
    { target: ROOM_IDS.dormitorio2, yaw: 100, pitch: 17, label: ROOM_TITLES[ROOM_IDS.dormitorio2] },
    { target: ROOM_IDS.cocina, yaw: 175, pitch: 5, label: ROOM_TITLES[ROOM_IDS.cocina] },
  ],
  [ROOM_IDS.banio]: [
    { target: ROOM_IDS.living, yaw: 74, pitch: 0, label: ROOM_TITLES[ROOM_IDS.living] },
    { target: ROOM_IDS.dormitorio1, yaw: 74, pitch: 17, label: ROOM_TITLES[ROOM_IDS.dormitorio1] },
    { target: ROOM_IDS.dormitorio2, yaw: 74, pitch: -17, label: ROOM_TITLES[ROOM_IDS.dormitorio2] },
  ],
  [ROOM_IDS.dormitorio1]: [
    { target: ROOM_IDS.living, yaw: -12, pitch: 17, label: ROOM_TITLES[ROOM_IDS.living] },
    { target: ROOM_IDS.dormitorio2, yaw: -12, pitch: 0, label: ROOM_TITLES[ROOM_IDS.dormitorio2] },
    { target: ROOM_IDS.banio, yaw: -12, pitch: -17, label: ROOM_TITLES[ROOM_IDS.banio] },
  ],
  [ROOM_IDS.dormitorio2]: [
    { target: ROOM_IDS.living, yaw: -17, pitch: -22, label: ROOM_TITLES[ROOM_IDS.living] },
    { target: ROOM_IDS.dormitorio1, yaw: -17, pitch: -5, label: ROOM_TITLES[ROOM_IDS.dormitorio1] },
    { target: ROOM_IDS.banio, yaw: -17, pitch: 12, label: ROOM_TITLES[ROOM_IDS.banio] },
  ],
  [ROOM_IDS.cocina]: [{ target: ROOM_IDS.living, yaw: -150, pitch: 12, label: ROOM_TITLES[ROOM_IDS.living] }],
};

/** Rooms that have a furnished variant available. */
const FURNISHABLE_ROOM_IDS: RoomId[] = [ROOM_IDS.living, ROOM_IDS.dormitorio1, ROOM_IDS.dormitorio2];

const FURNISHED_IMAGES: Partial<Record<RoomId, string>> = {
  [ROOM_IDS.living]: livingAmuebladoImage,
  [ROOM_IDS.dormitorio1]: dormitorio1AmuebladoImage,
  [ROOM_IDS.dormitorio2]: dormitorio2AmuebladoImage,
};

/** Suffix used to build a furnished scene's id from its base room id. */
const FURNISHED_SUFFIX = 'Amueblado';

export function getFurnishedRoomId(baseRoomId: RoomId): RoomId {
  return `${baseRoomId}${FURNISHED_SUFFIX}`;
}

export function getBaseRoomId(roomId: RoomId): RoomId {
  return roomId.endsWith(FURNISHED_SUFFIX) ? (roomId.slice(0, -FURNISHED_SUFFIX.length) as RoomId) : roomId;
}

export function isFurnishedRoomId(roomId: RoomId): boolean {
  return roomId.endsWith(FURNISHED_SUFFIX);
}

export function hasFurnishedVariant(roomId: RoomId): boolean {
  return FURNISHABLE_ROOM_IDS.includes(getBaseRoomId(roomId));
}

const BASE_ROOMS: Room[] = Object.values(ROOM_IDS).map((id) => ({
  id,
  title: ROOM_TITLES[id],
  image: ROOM_IMAGES[id],
  initialYaw: ROOM_INITIAL_VIEW[id].yaw,
  initialPitch: ROOM_INITIAL_VIEW[id].pitch,
  initialHfov: INITIAL_HFOV,
  hotspots: ROOM_HOTSPOTS[id],
}));

// Furnished variants reuse the base room's hotspots as-is, so navigating
// away (via a hotspot) always lands on the *empty* version of the next
// room - furniture state never "leaks" into other rooms.
const FURNISHED_ROOMS: Room[] = FURNISHABLE_ROOM_IDS.map((baseId) => {
  const baseRoom = BASE_ROOMS.find((room) => room.id === baseId)!;
  return {
    ...baseRoom,
    id: getFurnishedRoomId(baseId),
    image: FURNISHED_IMAGES[baseId]!,
  };
});

export const ROOMS: Room[] = [...BASE_ROOMS, ...FURNISHED_ROOMS];

export const ROOMS_BY_ID: Record<RoomId, Room> = Object.fromEntries(
  ROOMS.map((room) => [room.id, room]),
) as Record<RoomId, Room>;