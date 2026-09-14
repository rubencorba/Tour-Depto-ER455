import { useRef, useState, type JSX } from 'react';
import FloorPlan from '../components/FloorPlan';
import FloorPlanToggle from '../components/FloorPlanToggle';
import FurnitureToggle from '../components/FurnitureToggle';
import PanoramaViewer from '../components/PanoramaViewer';
import RotateDevicePrompt from '../components/RotateDevicePrompt';
import { getBaseRoomId, getFurnishedRoomId, hasFurnishedVariant, isFurnishedRoomId } from '../data/roomsConfig';
import { useOrientation } from '../hooks/useOrientation';
import { usePannellumViewer } from '../hooks/usePannellumViewer';
import { isMobileUserAgent } from '../utils/device';
import { TOUR_CONFIG } from '../services/pannellumService';
import type { RoomId } from '../types/room';

export default function Tour(): JSX.Element {
  const isPortraitPhone = useOrientation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { viewerRef, currentRoomId } = usePannellumViewer(containerRef, TOUR_CONFIG);
  const [isPlanOpen, setIsPlanOpen] = useState(false);

  const baseRoomId = currentRoomId ? getBaseRoomId(currentRoomId) : null;
  const isFurnished = currentRoomId ? isFurnishedRoomId(currentRoomId) : false;
  const canFurnish = baseRoomId ? hasFurnishedVariant(baseRoomId) : false;

  const floorPlanSizeClass = isMobileUserAgent() ? 'floor-plan-panel--mobile' : '';

  const handleSelectRoom = (roomId: RoomId) => {
    viewerRef.current?.loadScene(roomId);
  };
  const isMobile = isMobileUserAgent();

  const controlsStackClass = isMobile
    ? 'tour-controls-stack tour-controls-stack--below-gyroscope'
    : 'tour-controls-stack';

  const handleToggleFurniture = () => {
    const viewer = viewerRef.current;
    if (!viewer || !currentRoomId) return;

    const pitch = viewer.getPitch();
    const yaw = viewer.getYaw();
    const hfov = viewer.getHfov();
    const targetSceneId = isFurnished ? getBaseRoomId(currentRoomId) : getFurnishedRoomId(currentRoomId);

    viewer.loadScene(targetSceneId, pitch, yaw, hfov);
  };

  return (
    <div className="relative h-dvh w-dvw overflow-hidden bg-black">
      <PanoramaViewer containerRef={containerRef} />
      <RotateDevicePrompt visible={isPortraitPhone} />
      <div className={controlsStackClass}>
        {canFurnish && <FurnitureToggle isFurnished={isFurnished} onToggle={handleToggleFurniture} />}
        <FloorPlanToggle isOpen={isPlanOpen} onToggle={() => setIsPlanOpen((open) => !open)} />
        <FloorPlan
          currentRoomId={baseRoomId}
          onSelectRoom={handleSelectRoom}
          className={`${floorPlanSizeClass} ${isPlanOpen ? 'block' : 'hidden'}`}
        />
      </div>
    </div>
  );
}