/**
 * A single interactive hotspot placed inside a panorama.
 * Hotspots are always positioned using spherical coordinates
 * (yaw / pitch) and link to another room by its `id`.
 */
export interface Hotspot {
  /** Id of the room this hotspot navigates to. Must match a Room.id. */
  target: string;
  /** Horizontal angle, in degrees, where the hotspot is placed. */
  yaw: number;
  /** Vertical angle, in degrees, where the hotspot is placed. */
  pitch: number;
  /** Text shown to the user when hovering/tapping the hotspot. */
  label: string;
}

/**
 * A single room of the apartment, represented as a 360° equirectangular
 * panorama scene.
 */
export interface Room {
  /** Unique identifier for the room. Used as the Pannellum scene id. */
  id: string;
  /** Human readable name displayed to the user. */
  title: string;
  /** Imported panorama image for this room. */
  image: string;
  /** Initial horizontal viewing angle, in degrees, when the scene loads. */
  initialYaw: number;
  /** Initial vertical viewing angle, in degrees, when the scene loads. */
  initialPitch: number;
  /** Initial horizontal field of view, in degrees, when the scene loads. */
  initialHfov: number;
  /** Hotspots that let the user navigate to neighboring rooms. */
  hotspots: Hotspot[];
}

/** Id of a room, used as the canonical key across the app (config, navigation, scenes). */
export type RoomId = Room['id'];
