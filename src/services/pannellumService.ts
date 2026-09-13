import type { Room, RoomId } from '../types/room';
import { FIRST_ROOM_ID, ROOMS } from '../data/roomsConfig';
import { isMobileUserAgent } from '../utils/device';

/** Degrees per second used for the idle auto-rotation of each scene. */
const AUTO_ROTATE_SPEED = -2;
/** Milliseconds of inactivity before auto-rotation starts. */
const AUTO_ROTATE_INACTIVITY_DELAY = 3000;
/** Milliseconds after load before auto-rotation stops (0 = never stops automatically). */
const AUTO_ROTATE_STOP_DELAY = 0;

const HOTSPOT_CSS_CLASS = isMobileUserAgent() ? 'tour-hotspot tour-hotspot--mobile' : 'tour-hotspot';

/**
 * Renders an always-visible label above a hotspot, replacing Pannellum's
 * default hover-only tooltip. `hotSpotDiv` is the hotspot's own element
 * (already positioned and wired up for click navigation by Pannellum),
 * so we only need to append our label to it.
 */
function createHotspotLabel(hotSpotDiv: HTMLDivElement, args: unknown): void {
  const label = document.createElement('div');
  label.className = 'tour-hotspot-label';
  label.textContent = String(args);
  hotSpotDiv.appendChild(label);
  hotSpotDiv.setAttribute('role', 'button');
  hotSpotDiv.setAttribute('aria-label', String(args));
}

/**
 * Builds a single Pannellum scene configuration from a Room definition.
 * Hotspots are always rendered as native Pannellum `scene` hot spots
 * (never floating HTML buttons), positioned via yaw/pitch.
 */
function buildSceneConfig(room: Room): Pannellum.ConfigOptions {
  return {
    type: 'equirectangular',
    panorama: room.image,
    title: room.title,
    yaw: room.initialYaw,
    pitch: room.initialPitch,
    hfov: room.initialHfov,
    hotSpots: room.hotspots.map((hotspot) => ({
      type: 'scene',
      sceneId: hotspot.target,
      yaw: hotspot.yaw,
      pitch: hotspot.pitch,
      cssClass: HOTSPOT_CSS_CLASS,
      createTooltipFunc: createHotspotLabel,
      createTooltipArgs: hotspot.label,
    })),
  };
}

/**
 * Builds the full Pannellum tour configuration (all scenes + defaults)
 * from the centralized room list. This is the only place that knows how
 * to translate our domain model into Pannellum's expected shape.
 */
export function buildTourConfig(rooms: Room[], firstSceneId: RoomId): Pannellum.TourOptions {
  const scenes: Record<string, Pannellum.ConfigOptions> = {};

  for (const room of rooms) {
    scenes[room.id] = buildSceneConfig(room);
  }

  return {
    default: {
      firstScene: firstSceneId,
      autoLoad: true,
      autoRotate: AUTO_ROTATE_SPEED,
      autoRotateInactivityDelay: AUTO_ROTATE_INACTIVITY_DELAY,
      autoRotateStopDelay: AUTO_ROTATE_STOP_DELAY,
      showFullscreenCtrl: false,
      compass: false,
      draggable: true,
      minHfov: 50,
      maxHfov: 120,
      sceneFadeDuration: 1000,
    },
    scenes,
  };
}

// Built once from the centralized room configuration - every scene and
// hotspot the viewer knows about comes from src/data/roomsConfig.ts.
export const TOUR_CONFIG = buildTourConfig(ROOMS, FIRST_ROOM_ID);