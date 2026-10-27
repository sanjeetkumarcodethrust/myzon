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

    // Check if location is already saved in localStorage and valid (not corrupted by raw "District")
    const isCorrupted = !location?.city || 
      /district/i.test(location.city) || 
      /distric/i.test(location.city) || 
      location.city === 'India Delivery' || 
      location.city === 'India';

    const hasExistingLocation = Boolean(location && location.city && location.pincode && !isCorrupted);

    // If browser already has geolocation permission granted, silently update to live GPS
    if (typeof navigator !== 'undefined' && navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' }).then((status) => {
        if (status.state === 'granted') {
          detectRealLocation().then((result) => {
            if (result && result.success && result.city) {
              setLocation(result.city, result.pincode || '');
            }
          }).catch(() => {});
        }
      }).catch(() => {});
    }

    // If already has saved valid location, don't show prompt toast
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
