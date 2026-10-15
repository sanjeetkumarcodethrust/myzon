// OTP generation, validation, and SMS delivery service
// Supports Fast2SMS (Indian SMS gateway), Twilio, and console simulation fallback.

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
 * Sends SMS via Fast2SMS (India's leading SMS gateway)
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
      return null;
    }
  } catch (err) {
    console.error(`❌ [FAST2SMS] Request error:`, err.message);
    return null;
  }
};

/**
 * Sends SMS via Twilio (Global SMS gateway)
 */
const sendViaTwilio = async (phone, otp) => {
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
    params.append("Body", `Your Myzon Studio login verification OTP is: ${otp}. Valid for 5 minutes. Do not share this code.`);

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
      console.log(`✅ [TWILIO] Real SMS dispatched to ${formattedPhone} (SID: ${data.sid})`);
      return { success: true, gateway: "twilio", providerResponse: data };
    } else {
      console.warn(`⚠️ [TWILIO] Failed to send SMS:`, data.message || data);
      return null;
    }
  } catch (err) {
    console.error(`❌ [TWILIO] Request error:`, err.message);
    return null;
  }
};

/**
 * Primary OTP Dispatcher
 */
export const sendOtp = async (identifier) => {
  const isPhone = !identifier.includes("@");
  const target = isPhone ? sanitizePhone(identifier) : identifier.trim().toLowerCase();

  if (isPhone && !isValidIndianPhone(target)) {
    throw new Error("Please enter a valid 10-digit Indian mobile number");
  }

  // Check cooldown (30 seconds between requests)
  const existing = otpStore.get(target);
  const now = Date.now();
  if (existing && now - existing.createdAt < 30 * 1000) {
    const waitSec = Math.ceil((30 * 1000 - (now - existing.createdAt)) / 1000);
    throw new Error(`Please wait ${waitSec}s before requesting a new OTP.`);
  }

  const otp = generateOtpCode();
  const ttlMs = 5 * 60 * 1000; // 5 minutes

  otpStore.set(target, {
    otp,
    expiresAt: now + ttlMs,
    attempts: 0,
    createdAt: now,
  });

  // Try real SMS gateways if this is a phone number
  let smsResult = null;
  if (isPhone) {
    // 1. Try Fast2SMS
    smsResult = await sendViaFast2SMS(target, otp);

    // 2. Try Twilio if Fast2SMS not configured or failed
    if (!smsResult) {
      smsResult = await sendViaTwilio(target, otp);
    }
  }

  if (smsResult && smsResult.success) {
    return {
      success: true,
      target,
      gateway: smsResult.gateway,
      message: `Verification code sent to +91 ${target} via SMS.`,
      expiresIn: 300,
    };
  }

  // Console output for simulation / development
  console.log(`\n╔════════════════════════════════════════════════════════════════════╗`);
  console.log(`║               📲  MYZON SMS SERVICE - OTP DISPATCH                 ║`);
  console.log(`╠════════════════════════════════════════════════════════════════════╣`);
  console.log(`║  Target   : ${isPhone ? "+91 " + target : target}`);
  console.log(`║  OTP Code : [ ${otp} ]                                          ║`);
  console.log(`║  Status   : Generated & Active (Valid for 5 mins)                  ║`);
  console.log(`║                                                                    ║`);
  console.log(`║  💡 Real SMS Info:                                                 ║`);
  console.log(`║     To deliver real SMS to user SIM cards:                         ║`);
  console.log(`║     Add FAST2SMS_API_KEY in backend/.env                           ║`);
  console.log(`╚════════════════════════════════════════════════════════════════════╝\n`);

  return {
    success: true,
    target,
    gateway: "simulated",
    otp, // Returned in simulated mode so UI / developer can view and verify
    message: isPhone
      ? `Verification code dispatched for +91 ${target}.`
      : `Verification code dispatched for ${target}.`,
    expiresIn: 300,
    hint: "Configure FAST2SMS_API_KEY in backend/.env for real SMS delivery to SIM card.",
  };
};

/**
 * Verify OTP
 */
export const verifyOtpCode = (identifier, enteredOtp) => {
  const isPhone = !identifier.includes("@");
  const target = isPhone ? sanitizePhone(identifier) : identifier.trim().toLowerCase();

  const record = otpStore.get(target);

  if (!record) {
    return { valid: false, message: "No OTP request found for this number/email. Please request an OTP first." };
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(target);
    return { valid: false, message: "OTP has expired. Please request a new OTP code." };
  }

  if (record.attempts >= 5) {
    otpStore.delete(target);
    return { valid: false, message: "Too many incorrect attempts. Please request a fresh OTP." };
  }

  if (record.otp !== enteredOtp.toString().trim()) {
    record.attempts += 1;
    return { valid: false, message: "Invalid OTP code. Please enter the correct 6-digit code." };
  }

  // Success - consume OTP to prevent reuse
  otpStore.delete(target);
  return { valid: true, target };
};
