import { useRef, useState, type JSX } from 'react';
import BackToLandingButton from '../components/BackToLandingButton';
import FloorPlan from '../components/FloorPlan';
import FloorPlanToggle from '../components/FloorPlanToggle';
import FullscreenToggle from '../components/FullScreenToggle';
import FurnitureToggle from '../components/FurnitureToggle';
import OnboardingToast from '../components/OnboardingToast';
import PanoramaViewer from '../components/PanoramaViewer';
import RotateDevicePrompt from '../components/RotateDevicePrompt';
import { getBaseRoomId, getFurnishedRoomId, hasFurnishedVariant, isFurnishedRoomId } from '../data/roomsConfig';
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
  const tourWrapperRef = useRef<HTMLDivElement>(null);
  const { viewerRef, currentRoomId } = usePannellumViewer(containerRef, TOUR_CONFIG);
  const [isPlanOpen, setIsPlanOpen] = useState(false);

  const baseRoomId = currentRoomId ? getBaseRoomId(currentRoomId) : null;
  const isFurnished = currentRoomId ? isFurnishedRoomId(currentRoomId) : false;
  const canFurnish = baseRoomId ? hasFurnishedVariant(baseRoomId) : false;

  const isMobile = isMobileUserAgent();
  const floorPlanSizeClass = isMobile ? 'floor-plan-panel--mobile' : '';

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
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    onExitTour();
  };

  return (
    <div ref={tourWrapperRef} className="relative h-dvh w-dvw overflow-hidden bg-black">
      <PanoramaViewer containerRef={containerRef} />
      <RotateDevicePrompt visible={isPortraitPhone} />
      <OnboardingToast />
      <BackToLandingButton onBack={handleBackToLanding} />
      <FullscreenToggle targetRef={tourWrapperRef} />
      <div className="tour-controls-stack">
        {canFurnish && <FurnitureToggle isFurnished={isFurnished} onToggle={handleToggleFurniture} />}
        <FloorPlanToggle isOpen={isPlanOpen} onToggle={() => setIsPlanOpen((open) => !open)} />
      </div>
      <FloorPlan
        currentRoomId={baseRoomId}
        onSelectRoom={handleSelectRoom}
        className={`${floorPlanSizeClass} ${isPlanOpen ? 'block' : 'hidden'}`}
      />
    </div>
  );
}