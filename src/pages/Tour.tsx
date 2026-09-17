import { useRef, useState, type JSX } from 'react';
import FloorPlan from '../components/FloorPlan';
import FloorPlanToggle from '../components/FloorPlanToggle';
import FurnitureToggle from '../components/FurnitureToggle';
import FullscreenToggle from '../components/FullScreenToggle';
import BackToLandingButton from '../components/BackToLandingButton';
import PanoramaViewer from '../components/PanoramaViewer';
import RotateDevicePrompt from '../components/RotateDevicePrompt';
import GyroscopeToast from '../components/GyroscopeToast';
import OnboardingToast from '../components/OnboardingToast';
import { getBaseRoomId, getFurnishedRoomId, hasFurnishedVariant, isFurnishedRoomId } from '../data/roomsConfig';
import { useFloorPlanLayout } from '../hooks/useFloorPlanLayout';
import { useOrientation } from '../hooks/useOrientation';
import { usePannellumViewer } from '../hooks/usePannellumViewer';
import { TOUR_CONFIG } from '../services/pannellumService';
import { isMobileUserAgent } from '../utils/device';
import type { RoomId } from '../types/room';

interface TourProps {
  onExitTour: () => void;
}

export default function Tour({ onExitTour }: TourProps): JSX.Element {
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

  const handleBackToLanding = () => {
    // Exit fullscreen first (if active) rather than leaving the browser
    // in fullscreen while Tour's DOM tree gets unmounted underneath it.
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => { });
    }
    onExitTour();
  };

  return (
    <div ref={tourWrapperRef} className="relative h-dvh w-dvw overflow-hidden bg-black">
      <PanoramaViewer containerRef={containerRef} />
      <RotateDevicePrompt visible={isPortraitPhone} />
      <OnboardingToast />
      <GyroscopeToast containerRef={containerRef} />
      <FullscreenToggle targetRef={tourWrapperRef} />
      <BackToLandingButton onBack={handleBackToLanding} />
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