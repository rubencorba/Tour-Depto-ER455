import { useRef, useState, type JSX } from 'react';
import FloorPlan from '../components/FloorPlan';
import FloorPlanToggle from '../components/FloorPlanToggle';
import FurnitureToggle from '../components/FurnitureToggle';
import FullscreenToggle from '../components/FullScreenToggle';
import PanoramaViewer from '../components/PanoramaViewer';
import RotateDevicePrompt from '../components/RotateDevicePrompt';
import { getBaseRoomId, getFurnishedRoomId, hasFurnishedVariant, isFurnishedRoomId } from '../data/roomsConfig';
import { useFloorPlanLayout } from '../hooks/useFloorPlanLayout';
import { useOrientation } from '../hooks/useOrientation';
import { usePannellumViewer } from '../hooks/usePannellumViewer';
import { TOUR_CONFIG } from '../services/pannellumService';
import { isMobileUserAgent } from '../utils/device';
import type { RoomId } from '../types/room';

export default function Tour(): JSX.Element {
  const isPortraitPhone = useOrientation();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const { viewerRef, currentRoomId } = usePannellumViewer(containerRef, TOUR_CONFIG);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const tourWrapperRef = useRef<HTMLDivElement>(null);
  const baseRoomId = currentRoomId ? getBaseRoomId(currentRoomId) : null;
  const isFurnished = currentRoomId ? isFurnishedRoomId(currentRoomId) : false;
  const canFurnish = baseRoomId ? hasFurnishedVariant(baseRoomId) : false;

  const isMobile = isMobileUserAgent();
  const controlsStackClass = isMobile
    ? 'tour-controls-stack tour-controls-stack--below-gyroscope'
    : 'tour-controls-stack';

  const { placement, sizePx } = useFloorPlanLayout(buttonsRef, isMobile);
  const floorPlanClassName = `${placement === 'beside' ? 'floor-plan-panel--beside' : ''} ${isPlanOpen ? 'block' : 'hidden'
    }`;
  const floorPlanStyle =
    placement === 'beside'
      ? { width: sizePx, height: sizePx, top: isMobile ? '4rem' : '1rem' }
      : { width: sizePx, height: sizePx };

  const handleSelectRoom = (roomId: RoomId) => {
    viewerRef.current?.loadScene(roomId);
  };

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
    <div ref={tourWrapperRef} className="relative h-dvh w-dvw overflow-hidden bg-black">
      <PanoramaViewer containerRef={containerRef} />
      <RotateDevicePrompt visible={isPortraitPhone} />
      <FullscreenToggle targetRef={tourWrapperRef} />
      <div className={controlsStackClass}>
        <div ref={buttonsRef} className="tour-buttons-group">
          {canFurnish && <FurnitureToggle isFurnished={isFurnished} onToggle={handleToggleFurniture} />}
          <FloorPlanToggle isOpen={isPlanOpen} onToggle={() => setIsPlanOpen((open) => !open)} />
        </div>
        <FloorPlan
          currentRoomId={baseRoomId}
          onSelectRoom={handleSelectRoom}
          className={floorPlanClassName}
          style={floorPlanStyle}
        />
      </div>
    </div>
  );
}