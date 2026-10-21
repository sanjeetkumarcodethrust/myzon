// Centralized API Client for Myzon (supports Render, Vercel, Localhost, & Custom URLs)

export const getBackendBaseUrl = () => {
  const fromEnv = (import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || '').trim();
  const fromStorage = typeof window !== 'undefined' ? (localStorage.getItem('MYZON_API_URL') || '').trim() : '';
  const fromWindow = typeof window !== 'undefined' && window.__MYZON_API_URL__ ? String(window.__MYZON_API_URL__).trim() : '';
  const raw = fromEnv || fromStorage || fromWindow || 'https://myzon-1.onrender.com';
  return raw ? raw.replace(/\/+$/, '') : '';
};

export const requestApi = async (path, options = {}) => {
  const customBase = getBackendBaseUrl();
  const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  const candidateUrls = [];
  if (customBase) {
    candidateUrls.push(`${customBase}${path}`);
  }
  candidateUrls.push(path);
  if (isLocalhost) {
    candidateUrls.push(`http://localhost:5000${path}`);
    candidateUrls.push(`http://127.0.0.1:5000${path}`);
  }

  // Retrieve token if user is logged in
  let token = null;
  try {
    const rawUser = localStorage.getItem('myzon_user');
    if (rawUser) {
      const parsed = JSON.parse(rawUser);
      token = parsed?.token || null;
    }
  } catch {
    token = null;
  }

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  let lastError = null;

  for (let i = 0; i < candidateUrls.length; i++) {
    const fullUrl = candidateUrls[i];
    try {
      const fetchOptions = {
        ...options,
        headers: defaultHeaders,
      };

      const response = await fetch(fullUrl, fetchOptions);

      // Handle 405 Method Not Allowed (Vercel static file trying to handle POST)
      if (response.status === 405 && !customBase) {
        throw new Error(
          'Error 405: Frontend ko backend URL nahi mila. Render backend connect karein ya VITE_API_URL set karein.'
        );
      }

      // 502 / Sleep on Render Free Tier
      if (response.status === 502) {
        throw new Error('Backend waking up from sleep (502). Please retry in 20-30 seconds.');
      }

      // If 404 and more candidate URLs exist, try next
      if (response.status === 404 && i < candidateUrls.length - 1) {
        continue;
      }

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        if (i < candidateUrls.length - 1) continue;
        throw new Error(`Invalid response from server (${response.status}).`);
      }

      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      return data;
    } catch (err) {
      lastError = err;
      if (i < candidateUrls.length - 1 && !err.message.includes('405')) {
        continue;
      }
    }
  }

  throw lastError || new Error('Unable to connect to backend server. Please verify backend connection.');
};

// Dispatch OTP (for mobile verification)
export const sendOtpApi = async ({ identifier, channel = 'sms' }) => {
  return requestApi('/api/auth/send-otp', {
    method: 'POST',
    body: JSON.stringify({ identifier, channel }),
  });
};

// Verify OTP
export const verifyOtpApi = async ({ identifier, otp, name }) => {
  return requestApi('/api/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify({ identifier, otp, name }),
  });
};

// Create Order (Dispatches Delivery OTP SMS)
export const createOrderApi = async (orderPayload) => {
  return requestApi('/api/orders', {
    method: 'POST',
    body: JSON.stringify(orderPayload),
  });
};

// Resend Delivery OTP via SMS
export const resendDeliveryOtpApi = async ({ orderId, phone, deliveryOtp }) => {
  return requestApi('/api/orders/resend-delivery-otp', {
    method: 'POST',
    body: JSON.stringify({ orderId, phone, deliveryOtp }),
  });
};

// Verify Delivery OTP
export const verifyDeliveryOtpApi = async ({ orderId, enteredOtp }) => {
  return requestApi('/api/orders/verify-delivery-otp', {
    method: 'POST',
    body: JSON.stringify({ orderId, enteredOtp }),
  });
};
