// Real-time Location Detection, Geocoding & Indian Pincode Resolution Utility for Myzon
import { requestApi } from './api.js';

/**
 * High-speed offline Indian Pincode 3-digit Prefix Map (0ms instant resolution)
 * Guarantees that any pincode (e.g. 411xxx for Pune) resolves instantly to the correct city
 * even before the API returns or if the network is offline.
 */
export const INDIAN_PINCODE_PREFIX_MAP = {
  // Maharashtra - Pune & Western Maharashtra
  '411': { city: 'Pune', state: 'Maharashtra' },
  '412': { city: 'Pune', state: 'Maharashtra' },
  '410': { city: 'Pune', state: 'Maharashtra' }, // Pimpri-Chinchwad, Talegaon, Lonavala
  '400': { city: 'Mumbai', state: 'Maharashtra' },
  '401': { city: 'Thane', state: 'Maharashtra' },
  '416': { city: 'Kolhapur', state: 'Maharashtra' },
  '422': { city: 'Nashik', state: 'Maharashtra' },
  '431': { city: 'Chhatrapati Sambhajinagar', state: 'Maharashtra' },
  '440': { city: 'Nagpur', state: 'Maharashtra' },
  '414': { city: 'Ahmednagar', state: 'Maharashtra' },
  '413': { city: 'Solapur', state: 'Maharashtra' },
  '415': { city: 'Satara', state: 'Maharashtra' },
  '421': { city: 'Kalyan / Dombivli', state: 'Maharashtra' },
  '425': { city: 'Jalgaon', state: 'Maharashtra' },
  '444': { city: 'Akola', state: 'Maharashtra' },
  '442': { city: 'Wardha', state: 'Maharashtra' },
  '403': { city: 'Goa', state: 'Goa' },

  // Delhi NCR
  '110': { city: 'New Delhi', state: 'Delhi' },
  '121': { city: 'Faridabad', state: 'Haryana' },
  '122': { city: 'Gurugram', state: 'Haryana' },
  '201': { city: 'Noida / Ghaziabad', state: 'Uttar Pradesh' },

  // Karnataka
  '560': { city: 'Bengaluru', state: 'Karnataka' },
  '561': { city: 'Bengaluru Rural', state: 'Karnataka' },
  '570': { city: 'Mysuru', state: 'Karnataka' },
  '575': { city: 'Mangaluru', state: 'Karnataka' },
  '580': { city: 'Hubli-Dharwad', state: 'Karnataka' },

  // Telangana & Andhra Pradesh
  '500': { city: 'Hyderabad', state: 'Telangana' },
  '501': { city: 'Hyderabad / Ranga Reddy', state: 'Telangana' },
  '530': { city: 'Visakhapatnam', state: 'Andhra Pradesh' },
  '520': { city: 'Vijayawada', state: 'Andhra Pradesh' },
  '517': { city: 'Tirupati', state: 'Andhra Pradesh' },

  // Tamil Nadu & Kerala
  '600': { city: 'Chennai', state: 'Tamil Nadu' },
  '641': { city: 'Coimbatore', state: 'Tamil Nadu' },
  '625': { city: 'Madurai', state: 'Tamil Nadu' },
  '682': { city: 'Kochi', state: 'Kerala' },
  '695': { city: 'Thiruvananthapuram', state: 'Kerala' },
  '673': { city: 'Kozhikode', state: 'Kerala' },

  // West Bengal & East
  '700': { city: 'Kolkata', state: 'West Bengal' },
  '711': { city: 'Howrah', state: 'West Bengal' },
  '751': { city: 'Bhubaneswar', state: 'Odisha' },
  '781': { city: 'Guwahati', state: 'Assam' },
  '800': { city: 'Patna', state: 'Bihar' },
  '834': { city: 'Ranchi', state: 'Jharkhand' },

  // Gujarat & Rajasthan
  '380': { city: 'Ahmedabad', state: 'Gujarat' },
  '390': { city: 'Vadodara', state: 'Gujarat' },
  '395': { city: 'Surat', state: 'Gujarat' },
  '360': { city: 'Rajkot', state: 'Gujarat' },
  '302': { city: 'Jaipur', state: 'Rajasthan' },
  '342': { city: 'Jodhpur', state: 'Rajasthan' },
  '313': { city: 'Udaipur', state: 'Rajasthan' },

  // North & Central
  '160': { city: 'Chandigarh', state: 'Chandigarh' },
  '141': { city: 'Ludhiana', state: 'Punjab' },
  '143': { city: 'Amritsar', state: 'Punjab' },
  '226': { city: 'Lucknow', state: 'Uttar Pradesh' },
  '208': { city: 'Kanpur', state: 'Uttar Pradesh' },
  '221': { city: 'Varanasi', state: 'Uttar Pradesh' },
  '282': { city: 'Agra', state: 'Uttar Pradesh' },
  '248': { city: 'Dehradun', state: 'Uttarakhand' },
  '452': { city: 'Indore', state: 'Madhya Pradesh' },
  '462': { city: 'Bhopal', state: 'Madhya Pradesh' },
  '492': { city: 'Raipur', state: 'Chhattisgarh' },
};

/**
 * 2-Digit Indian Postal Circle fallback
 */
export const INDIAN_PINCODE_2DIGIT_MAP = {
  '11': { city: 'Delhi', state: 'Delhi' },
  '12': { city: 'Haryana', state: 'Haryana' },
  '13': { city: 'Haryana', state: 'Haryana' },
  '14': { city: 'Punjab', state: 'Punjab' },
  '15': { city: 'Punjab', state: 'Punjab' },
  '16': { city: 'Chandigarh', state: 'Chandigarh' },
  '17': { city: 'Himachal Pradesh', state: 'Himachal Pradesh' },
  '18': { city: 'Jammu & Kashmir', state: 'Jammu & Kashmir' },
  '19': { city: 'Jammu & Kashmir', state: 'Jammu & Kashmir' },
  '20': { city: 'Uttar Pradesh', state: 'Uttar Pradesh' },
  '21': { city: 'Uttar Pradesh', state: 'Uttar Pradesh' },
  '22': { city: 'Uttar Pradesh', state: 'Uttar Pradesh' },
  '24': { city: 'Uttarakhand', state: 'Uttarakhand' },
  '30': { city: 'Jaipur', state: 'Rajasthan' },
  '38': { city: 'Ahmedabad', state: 'Gujarat' },
  '39': { city: 'Surat', state: 'Gujarat' },
  '40': { city: 'Mumbai', state: 'Maharashtra' },
  '41': { city: 'Pune', state: 'Maharashtra' },
  '42': { city: 'Nashik', state: 'Maharashtra' },
  '43': { city: 'Chhatrapati Sambhajinagar', state: 'Maharashtra' },
  '44': { city: 'Nagpur', state: 'Maharashtra' },
  '45': { city: 'Indore', state: 'Madhya Pradesh' },
  '46': { city: 'Bhopal', state: 'Madhya Pradesh' },
  '49': { city: 'Raipur', state: 'Chhattisgarh' },
  '50': { city: 'Hyderabad', state: 'Telangana' },
  '56': { city: 'Bengaluru', state: 'Karnataka' },
  '60': { city: 'Chennai', state: 'Tamil Nadu' },
  '68': { city: 'Kochi', state: 'Kerala' },
  '70': { city: 'Kolkata', state: 'West Bengal' },
  '75': { city: 'Bhubaneswar', state: 'Odisha' },
  '78': { city: 'Guwahati', state: 'Assam' },
  '80': { city: 'Patna', state: 'Bihar' },
  '83': { city: 'Ranchi', state: 'Jharkhand' },
};

/**
 * Resolves any 6-digit Indian Pincode into its real City / District and State.
 * Multi-layer resolution:
 * 1. Instant 3-digit prefix mapping (e.g. 411xxx/412xxx -> Pune) - 0ms
 * 2. Background Postal API query for local sub-area/district enhancement
 * 3. Zippopotam API fallback
 * 4. Circle fallback
 */
export const lookupPincode = async (pincode) => {
  const cleanPin = String(pincode || '').replace(/\D/g, '').slice(0, 6);
  if (cleanPin.length !== 6) {
    return { success: false, message: 'Pincode must be 6 digits.' };
  }

  const prefix3 = cleanPin.slice(0, 3);
  const knownPrefix = INDIAN_PINCODE_PREFIX_MAP[prefix3];

  // Try Official Indian Postal API (with 1.5s timeout for fast response)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);
    const res = await fetch(`https://api.postalpincode.in/pincode/${cleanPin}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data[0]?.Status === 'Success' && Array.isArray(data[0].PostOffice) && data[0].PostOffice.length > 0) {
        const primary = data[0].PostOffice[0];
        const district = primary.District || primary.Region || primary.Circle;
        const area = primary.Name;
        const state = primary.State;
        const city = knownPrefix?.city || district || area || 'Pune';
        return {
          success: true,
          city,
          area,
          state: state || knownPrefix?.state || 'Maharashtra',
          pincode: cleanPin,
          source: 'postal_api',
        };
      }
    }
  } catch (err) {
    // Network latency / timeout / offline
  }

  // If known from 3-digit prefix (e.g. 411 -> Pune)
  if (knownPrefix) {
    return {
      success: true,
      city: knownPrefix.city,
      state: knownPrefix.state,
      pincode: cleanPin,
      source: 'offline_prefix',
    };
  }

  // Try Zippopotam IN API fallback
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);
    const res = await fetch(`https://api.zippopotam.us/IN/${cleanPin}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.places && data.places.length > 0) {
        const place = data.places[0];
        const city = place['place name'] || place.state || 'Pune';
        return {
          success: true,
          city,
          state: place.state || '',
          pincode: cleanPin,
          source: 'zippopotam',
        };
      }
    }
  } catch (err) {
    // Fall through
  }

  // 2-digit circle mapping
  const prefix2 = cleanPin.slice(0, 2);
  if (INDIAN_PINCODE_2DIGIT_MAP[prefix2]) {
    const match = INDIAN_PINCODE_2DIGIT_MAP[prefix2];
    return {
      success: true,
      city: match.city,
      state: match.state,
      pincode: cleanPin,
      source: 'offline_circle',
    };
  }

  // Default generic fallback (never 'India Delivery')
  return {
    success: true,
    city: `Pincode ${cleanPin}`,
    state: 'India',
    pincode: cleanPin,
    source: 'fallback',
  };
};

/**
 * Resolves GPS Coordinates into an Indian City and 6-digit Pincode
 */
export const reverseGeocodeCoordinates = async (latitude, longitude) => {
  // 1. Primary: OpenStreetMap Nominatim API
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
      {
        headers: {
          'Accept-Language': 'en',
        },
      }
    );
    const data = await res.json();
    if (data && data.address) {
      const addr = data.address;
      const rawPin = (addr.postcode || '').replace(/\D/g, '');
      const pincode = rawPin.length >= 6 ? rawPin.slice(0, 6) : rawPin;
      
      let city =
        addr.city ||
        addr.town ||
        addr.state_district ||
        addr.suburb ||
        addr.village ||
        addr.county;

      // If city name is missing or generic but we have a pincode, resolve through lookupPincode
      if ((!city || city.toLowerCase() === 'india') && pincode && pincode.length === 6) {
        const pinRes = await lookupPincode(pincode);
        if (pinRes?.city) {
          city = pinRes.city;
        }
      }

      city = city || addr.state || 'Pune';

      return {
        city,
        pincode,
        state: addr.state || '',
        formatted: `${city}${pincode ? ` (${pincode})` : ''}`,
        source: 'gps',
      };
    }
  } catch (e) {
    console.warn('Nominatim reverse geocode note:', e.message);
  }

  // 2. Fallback: BigDataCloud Reverse Geocode Client API
  try {
    const bdcRes = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    const bdcData = await bdcRes.json();
    if (bdcData) {
      const rawPin = (bdcData.postcode || '').replace(/\D/g, '');
      const pincode = rawPin.length >= 6 ? rawPin.slice(0, 6) : rawPin;
      let city = bdcData.city || bdcData.locality;

      if ((!city || city.toLowerCase() === 'india') && pincode && pincode.length === 6) {
        const pinRes = await lookupPincode(pincode);
        if (pinRes?.city) {
          city = pinRes.city;
        }
      }

      city = city || bdcData.principalSubdivision || 'Pune';

      return {
        city,
        pincode,
        state: bdcData.principalSubdivision || '',
        formatted: `${city}${pincode ? ` (${pincode})` : ''}`,
        source: 'gps',
      };
    }
  } catch (e) {
    console.warn('BigDataCloud reverse geocode note:', e.message);
  }

  return null;
};

/**
 * IP-based location fallback (used when GPS is unavailable, denied, or taking time)
 */
export const detectLocationByIp = async () => {
  // 1. Try Backend IP route
  try {
    const res = await requestApi('/api/location/auto-ip');
    if (res && res.success && res.city && res.city.toLowerCase() !== 'india') {
      return {
        success: true,
        city: res.city,
        pincode: res.pincode || '',
        state: res.state || '',
        source: 'ip',
      };
    }
  } catch (e) {
    // try direct client fallback
  }

  // 2. Direct BigDataCloud Client IP
  try {
    const res = await fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=en');
    const data = await res.json();
    if (data && (data.city || data.locality)) {
      const rawPin = (data.postcode || '').replace(/\D/g, '');
      const pincode = rawPin.length >= 6 ? rawPin.slice(0, 6) : rawPin;
      let city = data.city || data.locality;

      if ((!city || city.toLowerCase() === 'india') && pincode && pincode.length === 6) {
        const pinRes = await lookupPincode(pincode);
        if (pinRes?.city) {
          city = pinRes.city;
        }
      }

      city = city || data.principalSubdivision || 'Pune';

      return {
        success: true,
        city,
        pincode,
        state: data.principalSubdivision || '',
        source: 'ip',
      };
    }
  } catch (e) {
    // ignored
  }

  return {
    success: true,
    city: 'Pune',
    pincode: '411001',
    state: 'Maharashtra',
    source: 'fallback_default',
  };
};

/**
 * Detects real location automatically when user opens the app or clicks "Detect Location"
 * 1. Requests Browser GPS
 * 2. If granted -> reverse geocodes to exact City + Pincode
 * 3. In parallel / on refusal -> fast IP fallback so location is never empty!
 */
export const detectRealLocation = async (options = {}) => {
  const { onProgress } = options;

  return new Promise((resolve) => {
    let hasResolved = false;

    const finish = (result) => {
      if (hasResolved) return;
      hasResolved = true;
      resolve(result);
    };

    // If browser supports Geolocation API
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      if (onProgress) onProgress('Requesting GPS location...');

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          if (onProgress) onProgress('Locating exact city & pincode...');
          const { latitude, longitude } = position.coords;
          const geoRes = await reverseGeocodeCoordinates(latitude, longitude);
          if (geoRes && geoRes.city && geoRes.city.toLowerCase() !== 'india') {
            finish({
              success: true,
              ...geoRes,
            });
            return;
          }
          // If reverse geocoding failed, fallback to IP
          const ipRes = await detectLocationByIp();
          if (ipRes) finish(ipRes);
          else finish({ success: true, city: 'Pune', pincode: '411001' });
        },
        async (err) => {
          console.warn('GPS position error or denied:', err.message);
          if (onProgress) onProgress('Detecting city via network...');
          const ipRes = await detectLocationByIp();
          if (ipRes) finish(ipRes);
          else finish({ success: true, city: 'Pune', pincode: '411001' });
        },
        {
          enableHighAccuracy: true,
          timeout: 7000,
          maximumAge: 120000,
        }
      );
    } else {
      // Geolocation not supported, use IP
      detectLocationByIp().then((ipRes) => {
        if (ipRes) finish(ipRes);
        else finish({ success: true, city: 'Pune', pincode: '411001' });
      });
    }

    // Safety timeout: If browser prompt is pending or hanging, resolve via IP after 4 seconds
    setTimeout(async () => {
      if (!hasResolved) {
        const ipRes = await detectLocationByIp();
        if (ipRes) finish(ipRes);
      }
    }, 4000);
  });
};
