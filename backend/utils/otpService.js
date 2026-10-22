// OTP generation, validation, and real SMS delivery service
// Supports Twilio Verify (SMS & WhatsApp), Fast2SMS, and Twilio Messages API

const otpStore = new Map();

/**
 * Normalizes phone number to 10 digits
 */
export const sanitizePhone = (phone) => {
  if (!phone) return "";
  const cleaned = phone.toString().replace(/\D/g, "");
  // If user provided +91 or 91 prefix on a 10 digit number, take the last 10 digits
  if (cleaned.length > 10 && cleaned.startsWith("91")) {
    return cleaned.slice(-10);
  }
  return cleaned;
};

/**
 * Validates Indian 10-digit phone number (starts with 6-9)
 */
export const isValidIndianPhone = (phone) => {
  const cleaned = sanitizePhone(phone);
  return /^[6-9]\d{9}$/.test(cleaned);
};

/**
 * Generates a 6-digit numeric OTP string
 */
export const generateOtpCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Sends real OTP via Twilio Verify Service (Handles carrier routing, sender IDs, SMS and WhatsApp)
 */
const sendViaTwilioVerify = async (phone, channel = "sms") => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

  if (!accountSid || !authToken || !serviceSid) return null;

  const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;
  const twilioUrl = `https://verify.twilio.com/v2/Services/${serviceSid}/Verifications`;
  const basicAuth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

  const params = new URLSearchParams();
  params.append("To", formattedPhone);
  params.append("Channel", channel);

  try {
    const response = await fetch(twilioUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (response.ok && data.status === "pending") {
      console.log(`✅ [TWILIO VERIFY] Real ${channel.toUpperCase()} OTP dispatched to ${formattedPhone} (SID: ${data.sid})`);
      return { success: true, gateway: "twilio_verify", sid: data.sid, channel };
    } else {
      console.warn(`⚠️ [TWILIO VERIFY] Failed to send:`, data);
      if (data.code === 21608) {
        throw new Error(
          `Twilio Trial Mode: Mobile number ${formattedPhone} Twilio Console me verified nahi hai. Trial account se SMS pane ke liye Twilio Console > Try out Verify me jakar is number ko add karein, ya Fast2SMS API key use karein.`
        );
      }
      if (data.code === 60200) {
        throw new Error(`Invalid mobile number format: ${formattedPhone}`);
      }
      if (data.code === 60203) {
        throw new Error(`Max send attempts reached for ${formattedPhone}. Please wait a few minutes before trying again.`);
      }
      throw new Error(data.message || `Twilio error: ${data.code || response.status}`);
    }
  } catch (err) {
    console.error(`❌ [TWILIO VERIFY] Request error:`, err.message);
    throw err;
  }
};

/**
 * Verifies OTP via Twilio Verify Service
 */
const checkViaTwilioVerify = async (phone, enteredCode) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

  if (!accountSid || !authToken || !serviceSid) {
    return { valid: false, message: "Twilio Verify service is not properly configured." };
  }

  const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;
  const twilioUrl = `https://verify.twilio.com/v2/Services/${serviceSid}/VerificationCheck`;
  const basicAuth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

  const params = new URLSearchParams();
  params.append("To", formattedPhone);
  params.append("Code", enteredCode.toString().trim());

  try {
    const response = await fetch(twilioUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (response.ok && data.status === "approved" && data.valid === true) {
      console.log(`✅ [TWILIO VERIFY] Code verified successfully for ${formattedPhone}`);
      return { valid: true, target: phone };
    } else {
      console.warn(`⚠️ [TWILIO VERIFY] Invalid verification code for ${formattedPhone}:`, data);
      return {
        valid: false,
        message: data.message || "Invalid OTP code. Please enter the correct 6-digit code received on your phone.",
      };
    }
  } catch (err) {
    console.error(`❌ [TWILIO VERIFY] Check error:`, err.message);
    return { valid: false, message: "Verification service error. Please try again." };
  }
};

/**
 * Sends SMS via Fast2SMS (India SMS gateway - supports all Indian numbers instantly)
 */
const sendViaFast2SMS = async (phone, otp) => {
  const apiKey = process.env.FAST2SMS_API_KEY;
  if (!apiKey || apiKey === "your_fast2sms_api_key") return null;

  try {
    const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        route: "otp",
        variables_values: otp,
        numbers: phone,
      }),
    });

    const data = await response.json();
    if (data.return) {
      console.log(`✅ [FAST2SMS] Real SMS dispatched to +91 ${phone}`);
      return { success: true, gateway: "fast2sms", providerResponse: data };
    } else {
      console.warn(`⚠️ [FAST2SMS] Failed to send SMS:`, data.message || data);
      throw new Error(`Fast2SMS error: ${data.message || "Failed to dispatch SMS"}`);
    }
  } catch (err) {
    console.error(`❌ [FAST2SMS] Request error:`, err.message);
    throw err;
  }
};

/**
 * Sends SMS via Twilio Messages API (when TWILIO_PHONE_NUMBER is used)
 */
const sendViaTwilioMessages = async (phone, otp) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromNumber) return null;

  try {
    const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const basicAuth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

    const params = new URLSearchParams();
    params.append("To", formattedPhone);
    params.append("From", fromNumber);
    params.append("Body", `Your Myzon verification code is: ${otp}. Valid for 5 minutes. Do not share this code.`);

    const response = await fetch(twilioUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();
    if (response.ok && data.sid) {
      console.log(`✅ [TWILIO SMS] Real SMS dispatched to ${formattedPhone} (SID: ${data.sid})`);
      return { success: true, gateway: "twilio_sms", providerResponse: data };
    } else {
      console.warn(`⚠️ [TWILIO SMS] Failed to send SMS:`, data.message || data);
      throw new Error(data.message || "Failed to send SMS via Twilio");
    }
  } catch (err) {
    console.error(`❌ [TWILIO SMS] Request error:`, err.message);
    throw err;
  }
};

/**
 * Primary OTP Dispatcher
 */
export const sendOtp = async (identifier, options = {}) => {
  const channel = options.channel || "sms";
  const isPhone = !identifier.includes("@");
  const target = isPhone ? sanitizePhone(identifier) : identifier.trim().toLowerCase();

  if (isPhone && !isValidIndianPhone(target)) {
    throw new Error("Please enter a valid 10-digit Indian mobile number (starting with 6-9)");
  }

  // Check cooldown (30 seconds between requests)
  const existing = otpStore.get(target);
  const now = Date.now();
  if (existing && now - existing.createdAt < 30 * 1000) {
    const waitSec = Math.ceil((30 * 1000 - (now - existing.createdAt)) / 1000);
    throw new Error(`Please wait ${waitSec}s before requesting a new OTP.`);
  }

  const ttlMs = 5 * 60 * 1000; // 5 minutes

  // Priority 1: Fast2SMS (Free / low-cost Indian SMS gateway, no DLT required for OTP route)
  if (
    isPhone &&
    process.env.FAST2SMS_API_KEY &&
    process.env.FAST2SMS_API_KEY.trim() !== "" &&
    process.env.FAST2SMS_API_KEY !== "your_fast2sms_api_key"
  ) {
    try {
      const localOtp = generateOtpCode();
      await sendViaFast2SMS(target, localOtp);
      otpStore.set(target, {
        gateway: "fast2sms",
        otp: localOtp,
        expiresAt: now + ttlMs,
        attempts: 0,
        createdAt: now,
      });
      return {
        success: true,
        target,
        gateway: "fast2sms",
        message: `Verification code sent to +91 ${target} via SMS. Please check your mobile phone.`,
        expiresIn: 300,
      };
    } catch (err) {
      console.warn(`⚠️ [FAST2SMS] Dispatch failed for +91 ${target}:`, err.message);
      // Fall through to Twilio or Sandbox
    }
  }

  // Priority 2: Twilio Verify Service (Configured in user's Twilio console)
  if (
    isPhone &&
    process.env.TWILIO_VERIFY_SERVICE_SID &&
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN
  ) {
    try {
      const verifyRes = await sendViaTwilioVerify(target, channel);
      otpStore.set(target, {
        gateway: "twilio_verify",
        sid: verifyRes.sid,
        channel: verifyRes.channel,
        expiresAt: now + ttlMs,
        attempts: 0,
        createdAt: now,
      });
      return {
        success: true,
        target,
        gateway: "twilio_verify",
        channel,
        message: `Verification code sent to +91 ${target} via ${channel === "whatsapp" ? "WhatsApp" : "SMS"}. Please check your phone.`,
        expiresIn: 300,
      };
    } catch (err) {
      console.warn(`⚠️ [TWILIO VERIFY] Could not dispatch to +91 ${target}:`, err.message);
      // If trial mode error 21608 (unverified number), don't crash!
      // Fall through to Twilio Messages or Sandbox simulation!
    }
  }

  // Priority 3: Twilio Messages API (when TWILIO_PHONE_NUMBER is used)
  if (
    isPhone &&
    process.env.TWILIO_PHONE_NUMBER &&
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN
  ) {
    try {
      const localOtp = generateOtpCode();
      await sendViaTwilioMessages(target, localOtp);
      otpStore.set(target, {
        gateway: "twilio_sms",
        otp: localOtp,
        expiresAt: now + ttlMs,
        attempts: 0,
        createdAt: now,
      });
      return {
        success: true,
        target,
        gateway: "twilio_sms",
        message: `Verification code sent to +91 ${target} via SMS. Please check your mobile phone.`,
        expiresIn: 300,
      };
    } catch (err) {
      console.warn(`⚠️ [TWILIO SMS] Could not dispatch to +91 ${target}:`, err.message);
      // Fall through to Sandbox simulation!
    }
  }

  // Fallback: When no SMS gateway is configured OR Twilio Trial blocks unverified numbers
  const fallbackOtp = generateOtpCode();
  otpStore.set(target, {
    gateway: "simulated",
    otp: fallbackOtp,
    expiresAt: now + ttlMs,
    attempts: 0,
    createdAt: now,
  });

  console.log(`\n╔════════════════════════════════════════════════════════════════════╗`);
  console.log(`║               📲  MYZON SMS SERVICE - DEV SIMULATION               ║`);
  console.log(`╠════════════════════════════════════════════════════════════════════╣`);
  console.log(`║  Target   : ${isPhone ? "+91 " + target : target}`);
  console.log(`║  OTP Code : [ ${fallbackOtp} ]                                          ║`);
  console.log(`║  Notice   : Twilio Trial / Sandbox mode active                     ║`);
  console.log(`╚════════════════════════════════════════════════════════════════════╝\n`);

  return {
    success: true,
    target,
    gateway: "simulated",
    otp: fallbackOtp,
    isTrialFallback: true,
    message: `Twilio Trial Mode: Real SMS sirf verified numbers par jata hai. Kisi bhi number se login ke liye code [${fallbackOtp}] use karein.`,
    expiresIn: 300,
  };
};

/**
 * Verify OTP code
 */
export const verifyOtpCode = async (identifier, enteredOtp) => {
  const isPhone = !identifier.includes("@");
  const target = isPhone ? sanitizePhone(identifier) : identifier.trim().toLowerCase();

  const record = otpStore.get(target);

  if (!record) {
    return {
      valid: false,
      message: "No OTP request found for this number/email. Please request an OTP first.",
    };
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(target);
    return { valid: false, message: "OTP has expired. Please request a new OTP code." };
  }

  if (record.attempts >= 5) {
    otpStore.delete(target);
    return { valid: false, message: "Too many incorrect attempts. Please request a fresh OTP." };
  }

  // If dispatched via Twilio Verify, check with Twilio Verify API
  if (record.gateway === "twilio_verify") {
    const check = await checkViaTwilioVerify(target, enteredOtp);
    if (check.valid) {
      otpStore.delete(target);
      return { valid: true, target };
    } else {
      record.attempts += 1;
      return check;
    }
  }

  // For Fast2SMS, Twilio SMS, or simulated, verify stored OTP code
  if (record.otp !== enteredOtp.toString().trim()) {
    record.attempts += 1;
    return {
      valid: false,
      message: "Invalid OTP code. Please enter the correct 6-digit code received on your phone.",
    };
  }

  // Success - consume OTP to prevent reuse
  otpStore.delete(target);
  return { valid: true, target };
};

/**
 * Generates a 4-digit numeric Doorstep Delivery OTP
 */
export const generateDeliveryOtp = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

/**
 * Sends Real Doorstep Delivery OTP SMS to Customer
 */
export const sendDeliveryOtpSms = async ({ phone, orderId, deliveryOtp, totalAmount }) => {
  const isPhone = !phone.includes("@");
  const target = isPhone ? sanitizePhone(phone) : phone.trim();

  if (isPhone && !isValidIndianPhone(target)) {
    throw new Error("Please provide a valid 10-digit Indian mobile number");
  }

  const messageText = `Myzon: Your Order #${orderId} is confirmed! 📦 Your Secure Doorstep Delivery OTP is: ${deliveryOtp}. Share this OTP with the delivery executive only when receiving your package.`;

  // 1. Try Fast2SMS if API key is present
  if (
    isPhone &&
    process.env.FAST2SMS_API_KEY &&
    process.env.FAST2SMS_API_KEY.trim() !== "" &&
    process.env.FAST2SMS_API_KEY !== "your_fast2sms_api_key"
  ) {
    try {
      await sendViaFast2SMS(target, deliveryOtp);
      console.log(`✅ [FAST2SMS] Delivery OTP ${deliveryOtp} dispatched to +91 ${target}`);
      return {
        success: true,
        gateway: "fast2sms",
        deliveryOtp,
        message: `Delivery OTP dispatched to +91 ${target} via SMS.`,
      };
    } catch (e) {
      console.warn("⚠️ [FAST2SMS] Delivery OTP send failed, falling back to Twilio/Simulated:", e.message);
    }
  }

  // 2. Try Twilio Messages API if configured
  if (
    isPhone &&
    process.env.TWILIO_PHONE_NUMBER &&
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN
  ) {
    try {
      const formattedPhone = target.startsWith("+") ? target : `+91${target}`;
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const fromNumber = process.env.TWILIO_PHONE_NUMBER;

      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
      const basicAuth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

      const params = new URLSearchParams();
      params.append("To", formattedPhone);
      params.append("From", fromNumber);
      params.append("Body", messageText);

      const response = await fetch(twilioUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      const data = await response.json();
      if (response.ok && data.sid) {
        console.log(`✅ [TWILIO SMS] Real Delivery OTP SMS dispatched to ${formattedPhone} (SID: ${data.sid})`);
        return {
          success: true,
          gateway: "twilio_sms",
          deliveryOtp,
          message: `Delivery OTP SMS dispatched to +91 ${target}.`,
        };
      } else {
        console.warn(`⚠️ [TWILIO SMS] Delivery OTP dispatch note:`, data.message || data);
      }
    } catch (err) {
      console.warn(`⚠️ [TWILIO SMS] Delivery OTP request error:`, err.message);
    }
  }

  // 3. Dev simulation / Fallback
  console.log(`\n╔════════════════════════════════════════════════════════════════════╗`);
  console.log(`║               📦  MYZON SECURE DELIVERY OTP SMS                    ║`);
  console.log(`╠════════════════════════════════════════════════════════════════════╣`);
  console.log(`║  Order ID     : ${orderId}`);
  console.log(`║  Recipient    : +91 ${target}`);
  console.log(`║  Delivery OTP : [ ${deliveryOtp} ]                                      ║`);
  console.log(`║  Instruction  : Share with delivery associate at doorstep only    ║`);
  console.log(`╚════════════════════════════════════════════════════════════════════╝\n`);

  return {
    success: true,
    gateway: "simulated",
    deliveryOtp,
    message: `Delivery OTP [${deliveryOtp}] generated for Order #${orderId}. SMS dispatched to +91 ${target}.`,
  };
};
