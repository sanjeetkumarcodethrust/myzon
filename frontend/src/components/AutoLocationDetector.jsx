import { useEffect, useRef } from 'react';
import { useUIStore } from '../store/useStore';
import { detectRealLocation } from '../utils/location';

/**
 * Automatically triggers real location detection when any user opens the app.
 * 1. Prompts browser for high-accuracy GPS (Real Location)
 * 2. Reverse geocodes to Indian City & Pincode
 * 3. Falls back to IP-based location automatically if GPS is slow or pending
 */
export const AutoLocationDetector = () => {
  const { location, setLocation, setIsDetectingLocation, showToast } = useUIStore();
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // Only trigger once per session when app opens
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    // Check if location is already saved in localStorage and valid
    const hasExistingLocation = Boolean(location && location.city && location.pincode);

    // If already has saved location, we can still silently refresh or let user keep it
    if (hasExistingLocation) {
      return;
    }

    const runAutoDetection = async () => {
      setIsDetectingLocation(true);
      try {
        const result = await detectRealLocation();
        if (result && result.success && result.city) {
          setLocation(result.city, result.pincode || '');
          showToast(`📍 Delivery location set to ${result.city}${result.pincode ? ` (${result.pincode})` : ''}`, 'cart');
        }
      } catch (e) {
        console.warn('Auto location detection note:', e.message);
      } finally {
        setIsDetectingLocation(false);
      }
    };

    runAutoDetection();
  }, [location, setLocation, setIsDetectingLocation, showToast]);

  return null;
};
