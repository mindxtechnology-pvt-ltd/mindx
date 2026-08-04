export const checkRateLimit = async () => {
  try {
    // Attempt to get the user's IP address
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    const userIP = data.ip || 'unknown_ip';
    
    const limitKey = `mindx_form_limit_${userIP}`;
    const trackingData = JSON.parse(localStorage.getItem(limitKey)) || { count: 0, firstSentAt: Date.now() };

    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
    const timeSinceFirstEmail = Date.now() - trackingData.firstSentAt;

    // Reset counter if 24 hours have passed
    if (timeSinceFirstEmail > TWENTY_FOUR_HOURS) {
      trackingData.count = 0;
      trackingData.firstSentAt = Date.now();
    }

    if (trackingData.count >= 3) {
      return { allowed: false, message: "You have reached the maximum limit of 3 inquiries per 24 hours. Please try again later or contact us directly via email." };
    }

    // Increment and save
    trackingData.count += 1;
    localStorage.setItem(limitKey, JSON.stringify(trackingData));
    
    return { allowed: true };
  } catch (error) {
    // Fallback if IP fetch fails (e.g. adblocker)
    const fallbackKey = 'mindx_form_limit_fallback';
    const trackingData = JSON.parse(localStorage.getItem(fallbackKey)) || { count: 0, firstSentAt: Date.now() };
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
    
    if (Date.now() - trackingData.firstSentAt > TWENTY_FOUR_HOURS) {
      trackingData.count = 0;
      trackingData.firstSentAt = Date.now();
    }

    if (trackingData.count >= 3) {
      return { allowed: false, message: "You have reached the maximum limit of 3 inquiries per 24 hours. Please try again later or contact us directly via email." };
    }

    trackingData.count += 1;
    localStorage.setItem(fallbackKey, JSON.stringify(trackingData));
    return { allowed: true };
  }
};
